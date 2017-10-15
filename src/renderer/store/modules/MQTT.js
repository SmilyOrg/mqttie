import { ContentType } from "../../constants.js";

const MQTT = require("async-mqtt");

let client = null;
let nextId = 0;
// const pending = [];
// let pendingTime = 0;

function parseType(text) {
  if (typeof text === 'string') {
    const lower = text.toLowerCase();

    if (lower === "on" || lower === "true" || lower === "online") {
      return { type: ContentType.BOOL, value: true };
    }

    if (lower === "off" || lower === "false" || lower === "offline") {
      return { type: ContentType.BOOL, value: false };
    }

    const num = Number(text);
    if (!Number.isNaN(num)) {
      return { type: ContentType.NUMBER, value: num };
    }

    const firstChar = text.charAt(0);
    if (firstChar === "{" || firstChar === "[") {
      try {
        const json = JSON.parse(text);
        return { type: ContentType.JSON, value: json };
      } catch (error) {
        // Ignore
      }
    }
  }

  return { type: ContentType.UNKNOWN, value: undefined };
}

const state = {
  client: {
    broker: "",
    status: "init",
  },
  messages: [],
  topics: {
    map: new Map(),
    list: [],
  },
  graph: {
    nodes: [],
    edges: [],
    nodeMap: new Map(),
  },
};

const getters = {
  messages: state => state.messages,
  client: state => state.client,
  nodes: state => state.graph.nodes,
  edges: state => state.graph.edges,
  topics: state => state.topics,
};

function addToGraph(msg, map, nodes, edges) {
  const pathSections = msg.topic.split("/");
  let partialPath = "";
  let parent = null;
  for (let i = 0; i < pathSections.length; i++) {
    const section = pathSections[i];
    const leaf = i === pathSections.length - 1;
    partialPath += section;
    // console.log(`partial path ${partialPath}`);
    let node = map.get(partialPath);
    if (node === undefined) {
      node = {
        id: partialPath,
        level: i,
        label: leaf ? `${section}\n${msg.content.text}` : section,
      };
      map.set(partialPath, node);
      nodes.push(node);
      // console.log(`add ${node.id} (${node.label})`);
      if (parent) {
        // console.log(`${parent.id} -> ${node.id}`);
        edges.push({
          from: parent.id,
          to: node.id,
        });
      }
    }
    parent = node;
    partialPath += "/";
  }
}

function addTopic(msg, topics) {
  let topic = topics.map.get(msg.topic);
  if (topic === undefined) {
    topic = {
      topic: msg.topic,
      contents: [],
    };
    topics.map.set(msg.topic, topic);
    topics.list.push(topic);
  }
  topic.contents.push(msg.content);
}

const mutations = {
  addMessages(state, msgs) {
    state.messages = state.messages.concat(msgs);
    const { nodeMap, nodes, edges } = state.graph;
    msgs.forEach(msg => addToGraph(msg, nodeMap, nodes, edges));
    msgs.forEach(msg => addTopic(msg, state.topics));
  },
  addMessage(state, msg) {
    state.messages.push(msg);

    const { nodeMap, nodes, edges } = state.graph;
    addToGraph(msg, nodeMap, nodes, edges);
    addTopic(msg, state.topics);

    // if (map)

    // state.graph.nodes.push({
    //   id: msg.id,
    //   label: msg.topic,
    // });
  },
  clientStatus(state, status) {
    console.log(status);
    state.client.status = status;
  },
  clientBroker(state, url) {
    state.client.broker = url;
  },
};

const actions = {
  connect(context, url) {
    context.commit("clientBroker", url);
    context.commit("clientStatus", "connecting");

    client = MQTT.connect(url, {
      clientId: "mqttie",
    });
    // client = MQTT.connect("tcp://test.mosquitto.org:1883");
    // client = MQTT.connect("tcp://mqtt.swifitch.cz:1883");
    client.on("connect", () => {
      context.commit("clientStatus", "connected");
    });
    client.on("reconnect", () => {
      context.commit("clientStatus", "reconnecting");
    });
    client.on("close", () => {
      context.commit("clientStatus", "disconnected");
    });
    client.on("offline", () => {
      context.commit("clientStatus", "offline");
    });
    client.on("error", (error) => {
      context.commit("clientStatus", `error: ${error}`);
    });
    client.on("message", (topic, message) => {
      const text = message.toString();
      const parsed = parseType(text);

      context.commit("addMessage", {
        id: nextId,
        topic,
        content: {
          raw: message,
          text,
          type: parsed.type,
          value: parsed.value,
        },
      });

      // const now = Date.now();
      // pending.push({
      //   id: nextId,
      //   topic,
      //   content: {
      //     raw: message,
      //     text,
      //     type: parsed.type,
      //     value: parsed.value,
      //   },
      // });
      // if (now - pendingTime > 100) {
      //   context.commit("addMessages", pending);
      //   pending.length = 0;
      //   pendingTime = now;
      // }
      nextId += 1;
    });
    // client.on("packetsend", (packet) => {
    // console.log("send", packet);
    // });
    // client.on("packetreceive", (packet) => {
    // console.log("recv", packet);
    // });
  },
  subscribe(context, topic) {
    if (!client) {
      console.log(`Unable to subscribe to ${topic}, client missing`);
      return;
    }
    client.subscribe(topic);
    // client.unsubscribe(topic);
    // setTimeout(() => client.unsubscribe(topic), 100);
  },
  disconnect() {
    console.log("Disconnecting?");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
