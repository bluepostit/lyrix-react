import React, { Component } from 'react';
import { Grid, Col, Row, ListGroup, FormControl, Form, FormGroup, ButtonToolbar, DropdownButton, Button, MenuItem, Glyphicon } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

const Root = (props) => (
    <div className="wrapper" {...props}/>
);

class LyricsListItem extends Component {
  render() {
    let item = this.props.item;
    return (
      <Link to={`/lyric/${item.id}`}>
        <li id={item.id}
            className="list-group-item lyrics-list-item"
            key={item.id}>
          <div className="hidden-sm">
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
  getFilteredLyrics() {
    let lyrics = this.props.lyrics,
      filterText = this.props.filterText.toLowerCase();
    let filterFunction = function(item) {
      let strings = [
        item.title.toLowerCase(),
        item.artist.toLowerCase(),
        item.lyrics.toLowerCase()
      ];
      let matching = strings.find(function(s) {
        return (s.indexOf(filterText) !== -1);
      });
      return !!matching;
    };
    let filtered = (filterText === "" ? lyrics : lyrics.filter(filterFunction));
    return filtered;
  }

  renderLyricsList() {
    let lyrics = this.getFilteredLyrics();
    let sortKey = this.props.sortKey;
    if (lyrics && lyrics.length && (sortKey !== 'natural')) {
      lyrics = lyrics.sort((a, b) => {
        let aString, bString;
        switch (sortKey) {
          case 'artist':
            aString = a.artist.toLowerCase();
            bString = b.artist.toLowerCase();
            break;
          case 'title':
            aString = a.title.toLowerCase();
            bString = b.title.toLowerCase();
            break;
          default:
            break;
        }
        if (aString < bString) {
          return -1;
        } else if (aString > bString) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return lyrics.map((item, i) => (
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

class LyricsSearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange =
      this.handleFilterTextInputChange.bind(this);
    this.handleFilterTextClear =
      this.handleFilterTextClear.bind(this);
    this.handleSortChange = 
      this.handleSortChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInputChange(e.target.value);
  }

  handleFilterTextClear() {
    this.props.onFilterTextInputChange('');
  }

  handleSortChange(e) {
    this.props.onSortChange(e);
  }

  render() {
    return (
      <div className="lyrics-search-bar-wrapper">
        <Form inline>
          <FormGroup controlId="formInlineSearch">
            <FormControl
              type="text"
              value={this.props.filterText}
              placeholder="Search..."
              onChange={this.handleFilterTextInputChange}
            />
            {' '}
            <Button className="hidden-xs" onClick={this.handleFilterTextClear}>
              <Glyphicon glyph="remove"></Glyphicon>
            </Button>
          </FormGroup>
          <ButtonToolbar>
            <DropdownButton title="Sort..." onSelect={this.handleSortChange} id="lyrics-list-sort-dropdown">
              <MenuItem eventKey="artist">Artist</MenuItem>
              <MenuItem eventKey="title">Title</MenuItem>
              <MenuItem disabled eventKey="natural">Natural</MenuItem>
            </DropdownButton>
            <Button className="visible-xs" onClick={this.handleFilterTextClear}>
              <div>
                <Glyphicon glyph="remove"></Glyphicon>
                <span>{' '}Clear search text</span>
              </div>
            </Button>
          </ButtonToolbar>
        </Form>
        
      </div>
    );
  }
}

class FilterableLyricsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      sortKey: "natural"
    };

    this.handleFilterTextInput =
      this.handleFilterTextInput.bind(this);
    this.handleSortChange =
      this.handleSortChange.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleSortChange(sortKey) {
    this.setState({
      sortKey: sortKey
    });
  }

  render() {
    return (
      <div>
        <LyricsSearchBar
          filterText={this.state.filterText}
          onFilterTextInputChange={this.handleFilterTextInput}
          onSortChange={this.handleSortChange}
        />
        <LyricsList
          lyrics={this.props.lyrics}
          filterText={this.state.filterText}
          sortKey={this.state.sortKey}
        />
      </div>
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
              <Col md={4}>
                <div className="sidebar">
                  <FilterableLyricsList lyrics={data} />
                </div>
              </Col>
              <Col md={8}>
                <div className="mainPane">
                  <Switch>
                    <Route path="/lyric/:lyricId" render={({ match }) => (
                      <Lyrics data={data.find(ly => String(ly.id) === match.params.lyricId)} />
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
                <FilterableLyricsList className="visible-xs visible-sm" lyrics={data}/>
              </Route>
              <Route path="/lyric/:lyricId" render={({ match }) => (
                <Lyrics data={data.find(ly => String(ly.id) === match.params.lyricId)} />
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
  },
  {
    title: "The Scientist",
    artist: "Coldplay",
    id: 2,
    lyrics: ""
  },
  {
    title: "In My Place",
    artist: "Coldplay",
    id: 3,
    lyrics: ""
  },
  {
    title: "Politik",
    artist: "Coldplay",
    id: 4,
    lyrics: ""
  },
  {
    title: "Jailbreak",
    artist: "AC/DC",
    id: 5,
    lyrics: ""
  },
  {
    title: "Dirty Deeds (Done Dirt Cheap)",
    artist: "AC/DC",
    id: 6,
    lyrics: ""
  },
  {
    title: "This Will Be Our Year",
    artist: "OK Go",
    id: 7,
    lyrics: ""
  },
  {
    title: "Istanbul",
    artist: "They Might Be Giants",
    id: 8,
    lyrics: ""
  },
  {
    title: "End Love",
    artist: "OK Go",
    id: 9,
    lyrics: ""
  },
  {
    title: "All Along the Watchtower",
    artist: "Jimi Hendrix",
    id: 10,
    lyrics: ""
  },
  {
    title: "Magical Mystery Tour",
    artist: "The Beatles",
    id: 11,
    lyrics: ""
  },
  {
    title: "Move to the City",
    artist: "Guns 'n Roses",
    id: 12,
    lyrics: ""
  },
  {
    title: "No Milk Today",
    artist: "Herman's Hermits",
    id: 13,
    lyrics: ""
  }
];

export default MainPage;
