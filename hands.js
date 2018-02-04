// JavaScript Document

const waveClient = require('xesto-wave');
const client = waveClient( "81794d5f522948ab84cb188e803ba30e" );

client.connect().then( controller => {
  //This is a Leap.Controller object, and we can pass it gesture names to have
  //our app react to gestures!

  controller.on("letter-a", () => {
    console.log("Woo! Swipe left!");
  });
})