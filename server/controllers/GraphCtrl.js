const async = require('async');
const queryDB = require('../dbconnector.js').query;

class GraphCtrl {
  getNodes (req, res) {
    queryDB(
      `
      MATCH  (n)-[l:SENDS]->(m)
      RETURN n.name,m.name
      `, { },
      function(data) {
        console.log(data);
        // const _data = data.map(x => x._fields[0].labels[0] + ' - ' + x._fields[0].properties.name);
        res.send(data);
          // commentCount = res[0].get("count").toString(); // fetch current rant count
      },
      function(err) {
          //onError(err);
          console.error(err.message);
          res.send(err.message);
      });
  };

  addEntities(req, res) {
    console.log('recueved add entities call');
    const s = req.body.source;
    const l = req.body.link;
    const t = req.body.target;
    console.log(s, l, t);
    res.send({s,l,t});
  }

  addNewLink (req, res) {
    const {source, link, target} = req.body;
    const query =  `
      MERGE (src:App {name: "${source}"})
      MERGE (tgt:App {name: "${target}"})
      MERGE (src)-[link:${link}]->(tgt) 
      RETURN src,link,tgt
      `;
    console.log(source, link, target, query);
    queryDB(
      query
      , { },
      function(data) {
        this.getNodes(res, req);
      },
      function(err) {
        console.error(err.message);
        res.send(err.message);
      });
  };

}

module.exports = new GraphCtrl();
