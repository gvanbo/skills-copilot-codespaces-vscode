// Create web server
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
  // Get the URL
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  let pathName = parsedUrl.pathname;
  pathName = pathName.replace(/^\/+|\/+$/g, "");

  // Get the HTTP method
  const method = req.method;

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the headers as an object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    // Choose the handler this request should go to. If one is not found, use the notFound handler
    const chosenHandler =
      typeof router[pathName] !== "undefined"
        ? router[pathName]
        : handlers.notFound;

    // Construct the data object to send to the handler
    const data = {