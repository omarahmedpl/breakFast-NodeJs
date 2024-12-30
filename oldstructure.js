const express = require("express");
const mysql2 = require("mysql2");
const app = express();
const simpleId = require("simple-id");
const PORT = 3000;
const db_connection = mysql2.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "breakfast",
});
// Restaurant EndPoints

app.get("/restaurants", (req, res, next) => {
  db_connection.execute("SELECT * FROM restaurant", (err, data) => {
    if (err) {
      console.log(err);

      return respondWithError(err, res);
    } else {
      if (data.length) {
        return res.status(200).json({
          message: "Restaurants Fetched Successfully",
          restaurants: data,
        });
      } else {
        return res.status(200).json({
          message: "No Restaurants Are Found!",
        });
      }
    }
  });
});

app.get("/restaurants/:id", (req, res, next) => {
  const { id } = req.params;
  db_connection.execute(
    "SELECT * FROM restaurant WHERE rest_id = ?",
    [id],
    (err, data) => {
      if (err) {
        console.log(err);

        return respondWithError(err, res);
      } else {
        if (data.length) {
          return res.status(200).json({
            message: "Restaurant Fetched Successfully",
            restaurant: data[0],
          });
        } else {
          return res.status(404).json({
            message: "This ID isn't found!",
          });
        }
      }
    }
  );
});

app.post("/restaurants", (req, res, next) => {
  const { rest_name } = req.body;
  const id = simpleId(8, "0123456789");
  db_connection.execute(
    "INSERT INTO restaurant(rest_id , rest_name) VALUE (? , ?)",
    [id, rest_name],
    (err, data) => {
      if (err) {
        console.log(err);
        return respondWithError(err, res);
      } else {
        return data.affectedRows
          ? res.status(201).json({
              message: "Restaurant Added Successfully",
              restaurant: { rest_name, id },
            })
          : res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
});

app.put("/restaurants/:id", (req, res, next) => {
  const { id } = req.params;
  const { rest_name } = req.body;
  db_connection.execute(
    "UPDATE restaurant SET rest_name = ? WHERE rest_id = ?",
    [rest_name, id],
    (err, data) => {
      if (err) {
        console.log(err);
        return respondWithError(err, res);
      } else {
        return data.affectedRows
          ? res.status(201).json({
              message: "Restaurant Updated Successfully",
              restaurant: rest_name,
            })
          : res.status(404).json({ message: "Resturant Not Found!" });
      }
    }
  );
});

app.delete("/restaurants/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  db_connection.execute(
    "DELETE FROM restaurant WHERE rest_id = ?",
    [id],
    (err, data) => {
      if (err) {
        console.log(err);
        return respondWithError(err, res);
      } else {
        return data.affectedRows
          ? res.status(201).json({
              message: "Restaurant Deleted Successfully",
              restaurant: id,
            })
          : res.status(404).json({ message: "Resturant Not Found!" });
      }
    }
  );
});

// Orders Endpoints

app.get("/orders", (req, res, next) => {
  db_connection.execute(
    "SELECT * FROM orders INNER JOIN restaurant on orders.order_rest = restaurant.rest_id",
    (err, data) => {
      if (err) {
        console.log(err);
        return respondWithError(err, res);
      } else {
        if (data.length) {
          return res.status(200).json({
            message: "Orders Fetched Successfully",
            orders: data,
          });
        } else {
          return res.status(404).json({
            message: "No Orders Are Found!",
          });
        }
      }
    }
  );
});

app.get("/orders/:id", (req, res, next) => {
  const { id } = req.params;
  db_connection.execute(
    `SELECT 
    orders.order_id,
    orders.order_name,
    orders.order_date,
    items.item_name, 
    items.item_id,
    orders_items.item_count,
    restaurant.*
    FROM 
    orders
    LEFT JOIN 
    orders_items ON orders.order_id = orders_items.order_id
    LEFT JOIN 
    items ON orders_items.item_id = items.item_id
    LEFT JOIN restaurant on orders.order_rest = restaurant.rest_id
    WHERE 
    orders.order_id = ?
    GROUP BY 
    items.item_id, items.item_name;
`,
    [id],
    (err, data) => {
      if (err) {
        console.log(err);

        return respondWithError(err, res);
      } else {
        if (data.length) {
          return res.status(200).json({
            message: "Order Fetched Successfully",
            order: data,
          });
        } else {
          return res.status(404).json({
            message: "This ID isn't found!",
          });
        }
      }
    }
  );
});

app.post("/orders", (req, res, next) => {
  const { order_rest, order_name } = req.body;
  const id = simpleId(8, "0123456789");
  db_connection.execute(
    "SELECT * from restaurant WHERE rest_id = ?",
    [order_rest],
    (err, data) => {
      if (err) {
        console.log(err);
        return respondWithError(err, res);
      } else {
        if (data.length) {
          db_connection.execute(
            "INSERT INTO orders(order_id , order_rest , order_name) VALUE (? , ?,?)",
            [id, order_rest, order_name],
            (err, data) => {
              if (err) {
                console.log(err);
                return res
                  .status(500)
                  .json({ message: "Internal Server Error" });
              } else {
                if (data.affectedRows) {
                  return res.status(201).json({
                    message: "Order Created Successfully",
                    order_rest,
                    order_name,
                    order_id: id,
                  });
                } else {
                  return res
                    .status(500)
                    .json({ message: "Internal Server Error" });
                }
              }
            }
          );
        } else {
          return res.status(404).json({ message: "Restaurant isn't found" });
        }
      }
    }
  );
});

app.delete("/orders/:id", (req, res, next) => {
  const { id } = req.params;
  db_connection.execute(
    `DELETE FROM orders WHERE order_id = ?`,
    [id],
    (err, data) => {
      if (err) {
        console.log(err);

        return respondWithError(err, res);
      } else {
        if (data.affectedRows) {
          return res.status(200).json({
            message: "Order Deleted Successfully",
          });
        } else {
          return res.status(404).json({
            message: "This ID isn't found!",
          });
        }
      }
    }
  );
});

app.put("/orders/:id", (req, res, next) => {
  const { id } = req.params;
  const { order_rest, order_name } = req.body;
  console.log(order_rest, order_name)
  db_connection.execute(
    "SELECT * from restaurant WHERE rest_id = ?",
    [order_rest],
    (err, data1) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      } else {
        if (data1.length) {
          db_connection.execute(
            `UPDATE orders SET order_rest = ? , order_name = ? WHERE orders.order_id = ?;`,
            [order_rest, order_name, id],
            (err, data) => {
              if (err) {
                console.log(err);

                return res
                  .status(500)
                  .json({ message: "Internal Server Error" });
              } else {
                if (data.affectedRows) {
                  return res.status(200).json({
                    message: "Order Updated Successfully",
                    new_order_details: {
                      ...data1[0],
                      order_id: id,
                      order_name,
                    },
                  });
                } else {
                  return res.status(404).json({
                    message: "This ID isn't found!",
                  });
                }
              }
            }
          );
        } else {
          return res.status(404).json({ message: "Restaurant isn't found" });
        }
      }
    }
  );
});

app.post("/orders/:id/add_item", (req, res, next) => {
  const { id } = req.params;
  let { item_id, item_count } = req.body;
  db_connection.execute(
    "SELECT * FROM orders WHERE order_id = ?",
    [id],
    (err, data) => {
      if (err) {
        return respondWithError(err, res);
      } else {
        if (data.length) {
          db_connection.execute(
            "SELECT * FROM items WHERE item_id = ?",
            [item_id],
            (err, data) => {
              if (err) respondWithError(err, res);
              else {
                if (data.length) {
                  db_connection.execute(
                    "SELECT * FROM orders_items WHERE item_id = ? AND order_id = ?",
                    [item_id, id],
                    (err, data) => {
                      if (err) {
                        console.log("lol");

                        respondWithError(err, res);
                      } else {
                        console.log(data.length);

                        item_count = data.length
                          ? parseInt(data[0].item_count) + parseInt(item_count)
                          : item_count;
                        const query = data.length
                          ? "UPDATE orders_items SET item_count = ? WHERE order_id = ? AND item_id = ? "
                          : "INSERT INTO orders_items(order_id , item_id , item_count) VALUES (?,?,?)";
                        const items_to_set = data.length
                          ? [item_count, id, item_id]
                          : [id, item_id, item_count];
                        db_connection.execute(
                          query,
                          items_to_set,
                          (err, data) => {
                            if (err) {
                              console.log("lol");

                              respondWithError(err, res);
                            } else {
                              if (data.affectedRows) {
                                return res.status(201).json({
                                  message: "Item Added Successfully",
                                  item: { order_id: id, item_id, item_count },
                                });
                              } else {
                                return res.status(500).json({
                                  message: "Internal Server Error !",
                                });
                              }
                            }
                          }
                        );
                      }
                    }
                  );
                } else {
                  return res.status(404).json({ message: "Item Not Found!" });
                }
              }
            }
          );
        } else {
          return res.status(404).json({ message: "This Order is Not Found!" });
        }
      }
    }
  );
});

app.delete("/orders/:id/:item_id", (req, res, next) => {
  const { id, item_id } = req.params;
  const items = [id, item_id];
  db_connection.execute(
    "SELECT * FROM orders_items WHERE order_id = ? AND item_id = ?",
    items,
    (err, data) => {
      if (err) respondWithError(err, res);
      else {
        if (data.length) {
          db_connection.execute(
            "DELETE FROM orders_items WHERE order_id = ? AND item_id = ?",
            items,
            (err, data) => {
              if (err) respondWithError(err, res);
              else {
                if (data.affectedRows) {
                  return res.status(200).json({
                    message: "Order Item Deleted Successfully !",
                    order: { ...items },
                  });
                } else {
                  return res.status(404).json({
                    message: "Order Item Not Found !",
                  });
                }
              }
            }
          );
        } else {
          return res.status(404).json({
            message: "Order Item Not Found !",
          });
        }
      }
    }
  );
});

app.put("/orders/:id/update_item", (req, res, next) => {
  const { id } = req.params;
  let { item_id, item_count } = req.body;
  console.log(item_id, item_count);
  db_connection.execute(
    "SELECT * FROM orders WHERE order_id = ?",
    [id],
    (err, data) => {
      if (err) {
        return respondWithError(err, res);
      } else {
        if (data.length) {
          db_connection.execute(
            "SELECT * FROM orders_items WHERE item_id = ? AND order_id = ?",
            [item_id, id],
            (err, data) => {
              if (err) {
                respondWithError(err, res);
              } else {
                const query =
                  "UPDATE orders_items SET item_count = ? WHERE order_id = ? AND item_id = ? ";
                const items_to_set = [item_count, id, item_id];
                db_connection.execute(query, items_to_set, (err, data) => {
                  if (err) respondWithError(err, res);
                  else {
                    console.log(data);

                    if (data.affectedRows) {
                      return res.status(201).json({
                        message: "Item Updated Successfully",
                        item: { order_id: id, item_id, item_count },
                      });
                    } else {
                      return res.status(500).json({
                        message: "Internal Server Error !",
                      });
                    }
                  }
                });
              }
            }
          );
        } else {
          return res.status(404).json({ message: "This Order is Not Found!" });
        }
      }
    }
  );
});

// Items Endpoints

app.get("/items", (req, res, next) => {
  db_connection.execute("SELECT * FROM items", (err, data) => {
    if (err) {
      console.log(err);
      return respondWithError(err, res);
    } else {
      if (data.length) {
        return res.status(200).json({
          message: "Items Fetched Successfully",
          items: data,
        });
      } else {
        return res.status(404).json({
          message: "No Items Are Found!",
        });
      }
    }
  });
});

app.get("/items/:id", (req, res, next) => {
  const { id } = req.params;
  db_connection.execute(
    "SELECT * FROM items WHERE item_id = ?",
    [id],
    (err, data) => {
      if (err) {
        console.log(err);
        return respondWithError(err, res);
      } else {
        if (data.length) {
          return res.status(200).json({
            message: "Item Fetched Successfully",
            item: data,
          });
        } else {
          return res.status(404).json({
            message: "Item Not Found!",
          });
        }
      }
    }
  );
});

app.delete("/items/:id", (req, res, next) => {
  const { id } = req.params;
  db_connection.execute(
    "DELETE FROM items WHERE item_id = ?",
    [id],
    (err, data) => {
      if (err) {
        console.log(err);
        return respondWithError(err, res);
      } else {
        if (data.affectedRows) {
          return res.status(200).json({
            message: "Item Deleted Successfully",
            item_id: id,
          });
        } else {
          return res.status(404).json({
            message: "Item Not Found!",
          });
        }
      }
    }
  );
});

app.put("/items/:id", (req, res, next) => {
  const { id } = req.params;
  const { item_name } = req.body;
  console.log(req.params);
  db_connection.execute(
    "UPDATE items SET item_name = ? WHERE item_id = ?",
    [item_name, id],
    (err, data) => {
      if (err) {
        console.log(err);
        return respondWithError(err, res);
      } else {
        if (data.affectedRows) {
          return res.status(200).json({
            message: "Item Updated Successfully",
            item: { item_id: id, item_name },
          });
        } else {
          return res.status(404).json({
            message: "Item Not Found!",
          });
        }
      }
    }
  );
});

app.post("/items", (req, res, next) => {
  const { item_name } = req.body;
  const id = simpleId(8, "0123456789");
  console.log(req.params);
  db_connection.execute(
    "INSERT INTO items(item_name , item_id) VALUE (? , ?)",
    [item_name, id],
    (err, data) => {
      if (err) {
        console.log(err);
        return respondWithError(err, res);
      } else {
        if (data.affectedRows) {
          return res.status(200).json({
            message: "Item Added Successfully",
            item: { item_id: id, item_name },
          });
        } else {
          return res.status(404).json({
            message: "Item Not Found!",
          });
        }
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`App is Working on PORT ${PORT}`);
});

db_connection.connect((err) => {
  if (err) console.log(err);
  else console.log("Database is Connected Successfully");
});
function respondWithError(err, res) {
  console.log(err);
  return res.status(500).json({ message: "Internal Server Error" });
}
