import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class Lyrics extends Component {
	render() {
		let lyrics = this.props.lyrics;
		return (
			<Grid className="lyricsContainer">
				<Row className="show-grid">
					<Col xs={12} md={8}>
						<h1 className="title">{lyrics.title}</h1>
					</Col>
				</Row>
				<Row className="show-grid">
					<Col xs={12} md={8}><h2 className="artist">{lyrics.artist}</h2></Col>
				</Row>
				<Row className="show-grid">
					<Col xs={12} md={8}><div className="lyrics">{lyrics.lyrics}</div></Col>
				</Row>
			</Grid>
		);
	}
}

class LyricsPage extends Component {
	render() {
		let simpleLyrics = {
			title: "Wish You Were Here",
			artist: "Pink Floyd",
			lyrics: `So, so you think you can tell
Heaven from hell
Blue skies from pain
Can you tell a green field
From a cold steel rail?
A smile from a veil?
Do you think you can tell?
Did they get you to trade
Your heroes for ghosts?
Hot ashes for trees?
Hot air for a cool breeze?
Cold comfort for change?
And did you exchange
A walk on part in the war
For a lead role in a cage?

How I wish, how I wish you were here
We're just two lost souls
Swimming in a fish bowl
Year after year
Running over the same old ground
And how we found
The same old fears
Wish you were here`
		};
		return (
			<Lyrics lyrics={simpleLyrics} />
		);
	}
}

export default LyricsPage;
