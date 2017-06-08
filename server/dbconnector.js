"use strict";

// REQUIRES
const neo4j = require("neo4j-driver").v1;
const db_auth = require("./config");

// GLOBALS
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic(db_auth.username, db_auth.password));

// Method perform all queries to the database
exports.query = function(query, params, onSuccess, onErr) {
  var session = driver.session();
  var collection = []; // Keep a record of all results
  session
    .run(query, params)
    .subscribe({
        onNext: function(record) {
            collection.push(record);
        },
        onCompleted: function() {
            if (onSuccess) {
                onSuccess(collection);
            }
            session.close();
        },
        onError: function(err) {
            if (onErr) {
                onErr(err);
            }
        }
    });
};
