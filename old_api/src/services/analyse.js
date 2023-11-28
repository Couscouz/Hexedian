const fs = require('fs')
const Parser = require("binary-parser").Parser

const data = fs.readFileSync('./binary')
//data.length = 1,347,782

// const ipHeader = new Parser()
//   .endianness("big")
//   .bit4("version")
//   .bit4("headerLength")
//   .uint8("tos")
//   .uint16("packetLength")
//   .uint16("id")
//   .bit3("offset")
//   .bit13("fragOffset")
//   .uint8("ttl")
//   .uint8("protocol")
//   .uint16("checksum")
//   .array("src", {
//     type: "uint8",
//     length: 4
//   })
//   .array("dst", {
//     type: "uint8",
//     length: 4
//   });

// // Prepare buffer to parse.
// const buf = Buffer.from(data, "hex");

// Parse buffer and show result

//100k fine
//const c = data.subarray(12,126830).toString('utf-8')
//const head = data.subarray(12,32295).toString('utf-8')
//console.log(JSON.parse(head));
const next = data.subarray(32300,126830).toString('utf-8').split()
//console.log(next)

//next = JSON.parse({next})
//const st = c.toString('utf8');
console.log(next);
//console.log(Object.keys(res));
