import Connector from './connector';

const connector = new Connector();

// 若gugu已经初始化
if (window.__gugu_init__) {
  window.__gugu_init__(connector);
} else {
  window.__gugu_connector__ = connector;
}
