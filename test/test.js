var fs = require("fs");
var MidiConvert = require("../build/MidiConvert");
var expect = require("chai").expect;

describe("API", function(){

	it("has parseTransport method", function(){
		expect(MidiConvert).to.have.property("parseTransport");
	});

	it("has parseParts method", function(){
		expect(MidiConvert).to.have.property("parseParts");
	});
});

describe("Goldberg Variation 1 format 1 midi file", function(){

	var midiData;
	var midiJson;

	before(function(done){
		fs.readFile("midi/bwv-988-v01.mid", "binary", function(err, data){
			if (!err){
				midiData = data;
				fs.readFile("midi/bwv-988-v01.json", "utf8", function(err, json){
					if (!err){
						midiJson = JSON.parse(json);
						done();
					}
				});
			}
		});
	});

	it("gets the time signature from the file", function(){
		var transportData = MidiConvert.parseTransport(midiData);
		expect(transportData).to.have.property("timeSignature");
		expect(transportData.timeSignature).to.be.an.array;
		expect(transportData.timeSignature).to.deep.equal([3, 4]);
	});

	it("gets the bpm from the file", function(){
		var transportData = MidiConvert.parseTransport(midiData);
		expect(transportData).to.have.property("bpm");
		expect(transportData.bpm).to.be.a.number;
		expect(transportData.bpm).to.be.closeTo(60, 0.001);
	});

	it("extracts the tracks from the file", function(){
		var trackData = MidiConvert.parseParts(midiData, {
			PPQ : 48,
			midiNote : true,
			noteName : true,
			velocity : true,
			duration: true
		});
		expect(trackData).to.have.all.keys(["upper:", "lower:"]);
		expect(trackData).to.deep.equal(midiJson);
	});

});

describe("Prelude in C format 1 midi file", function(){

	var midiData;
	var midiJson;

	before(function(done){
		fs.readFile("midi/bwv-846.mid", "binary", function(err, data){
			if (!err){
				midiData = data;
				fs.readFile("midi/bwv-846.json", "utf8", function(err, json){
					if (!err){
						midiJson = JSON.parse(json);
						done();
					}
				});
			}
		});
	});

	it("gets the time signature from the file", function(){
		var transportData = MidiConvert.parseTransport(midiData);
		expect(transportData).to.have.property("timeSignature");
		expect(transportData.timeSignature).to.be.an.array;
		expect(transportData.timeSignature).to.deep.equal([4, 4]);
	});

	it("gets the bpm from the file", function(){
		var transportData = MidiConvert.parseTransport(midiData);
		expect(transportData).to.have.property("bpm");
		expect(transportData.bpm).to.be.a.number;
		expect(transportData.bpm).to.be.closeTo(62.41, 0.001);
	});

	it("extracts the tracks from the file", function(){
		var trackData = MidiConvert.parseParts(midiData, {
			PPQ : 96,
			midiNote : true,
			noteName : false,
			velocity : true,
			duration: true
		});
		expect(trackData).to.have.all.keys(["Fuga 1", "Fuga 2", "Fuga 3", "Fuga 4", "Piano left", "Piano right"]);
		expect(trackData).to.deep.equal(midiJson);
	});

});

describe("Prelude in D minor format 0 midi file", function(){

	var midiData;
	var midiJson;

	before(function(done){
		fs.readFile("midi/bwv-850.mid", "binary", function(err, data){
			if (!err){
				midiData = data;
				fs.readFile("midi/bwv-850.json", "utf8", function(err, json){
					if (!err){
						midiJson = JSON.parse(json);
						done();
					}
				});
			}
		});
	});

	it("gets the time signature from the file", function(){
		var transportData = MidiConvert.parseTransport(midiData);
		expect(transportData).to.have.property("timeSignature");
		expect(transportData.timeSignature).to.be.an.array;
		expect(transportData.timeSignature).to.deep.equal([4, 4]);
	});

	it("gets the bpm from the file", function(){
		var transportData = MidiConvert.parseTransport(midiData);
		expect(transportData).to.have.property("bpm");
		expect(transportData.bpm).to.be.a.number;
		expect(transportData.bpm).to.be.closeTo(51, 0.001);
	});

	it("extracts the track from the file", function(){
		var trackData = MidiConvert.parseParts(midiData, {
			PPQ : 24,
			midiNote : true,
			noteName : false,
			velocity : true,
			duration: true
		});
		expect(trackData).to.have.all.keys(["Präludium und Fuge in D-Dur, BWV 850"]);
		expect(trackData).to.deep.equal(midiJson);
	});

});

describe("Prelude in C minor format 0 midi file", function(){

	var midiData;
	var midiJson;

	before(function(done){
		fs.readFile("midi/bwv-847.mid", "binary", function(err, data){
			if (!err){
				midiData = data;
				fs.readFile("midi/bwv-847.json", "utf8", function(err, json){
					if (!err){
						midiJson = JSON.parse(json);
						done();
					}
				});
			}
		});
	});

	it("extracts the track from the file", function(){
		var trackData = MidiConvert.parseParts(midiData, {
			PPQ : 48,
			midiNote : true,
			noteName : true,
			velocity : true,
			duration: true
		});
		expect(trackData).to.have.all.keys(["Das wohltemperierte Klavier I - Praeludium und Fuge 2 in c-Moll BWV 847"]);
		expect(trackData).to.deep.equal(midiJson);
	});

});