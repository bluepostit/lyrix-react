import React, { Component } from 'react';
import { Grid, Col, Row, ListGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

const Root = (props) => (
    <div className="wrapper" {...props}/>
);

class LyricsListItem extends Component {
  render() {
    let item = this.props.item;
    console.log('LyricsListItem::render()', item);
    return (
      <Link to={`/lyric/${item.id}`}>
        <li id={item.id}
            className="list-group-item lyrics-list-item"
            key={item.id}>
          <div className="visible-xs visible-md visible-lg">
            <div className="title">{item.title}</div>
            <div className="artist">{item.artist}</div>
          </div>
          <div className="visible-sm">
            <span className="title">{item.title}</span>
            <span className="dash">&mdash;</span>
            <span className="artist">{item.artist}</span>
          </div>
        </li>
      </Link>
    );
  }
}

class LyricsList extends Component {
  renderLyricsList() {
    let lst = this.props.data;
    return lst.map((item, i) => (
      <LyricsListItem item={item} key={item.id} />
    ));
  }

  render() {
    return (
      <ListGroup className="lyrics-list-container" componentClass="ul">
        {this.renderLyricsList()}
      </ListGroup>
    );
  }
}

class Lyrics extends Component {
  render() {
    let data = this.props.data;
    return (
      <Grid className="lyrics-container">
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <h1 className="title">{data.title}</h1>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={8}><h2 className="artist">{data.artist}</h2></Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={8}><div className="lyrics">{data.lyrics}</div></Col>
        </Row>
      </Grid>
    );
  }
}

class MainPage extends Component {
  render() {
    let data = songData;
    return (
      <Router>
        <Root>
          <Grid className="visible-md visible-lg">
            <Row className="show-grid">
              <Col md={3}>
                <div className="sidebar">
                  <LyricsList data={data} />
                </div>
              </Col>
              <Col md={9}>
                <div className="mainPane">
                  <Switch>
                    <Route path="/lyric/:lyricId" render={({ match }) => (
                      <Lyrics data={data.find(ly => ly.id == match.params.lyricId)} />
                    )}/>
                    <Route exact path="/" render={() => (
                      <h1>No Song Selected</h1>
                    )}/>
                  </Switch>
                </div>
              </Col>
            </Row>
          </Grid>
          <div className="visible-xs visible-sm">
            <Switch>
              <Route exact path="/">
                <LyricsList className="visible-xs visible-sm" data={data} asSideBar={false}/>
              </Route>
              <Route path="/lyric/:lyricId" render={({ match }) => (
                <Lyrics data={data.find(ly => ly.id == match.params.lyricId)} />
              )}/>
            </Switch>
          </div>
        </Root>
      </Router>
    );
  }
}








var songData = [
  {
    title: "All My Loving",
    artist: "The Beatles",
    id: '0',
    lyrics: "Close your eyes while I kiss you..."
  },
  {
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    id: '1',
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
  }
];

export default MainPage;
