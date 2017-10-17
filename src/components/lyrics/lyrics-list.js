import React, { Component } from 'react';
import { ListGroup, FormControl, Form, FormGroup, ButtonToolbar, DropdownButton, Button, MenuItem, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../App.css';


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
            <div className="artist">{item.artist_name}</div>
          </div>
          <div className="visible-sm">
            <span className="title">{item.title}</span>
            <span className="dash">&mdash;</span>
            <span className="artist">{item.artist_name}</span>
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
        item.artist_name.toLowerCase()
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
            aString = a.artist_name.toLowerCase();
            bString = b.artist_name.toLowerCase();
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
    console.log('rendering filterable with lyrics: ', this.props.lyrics);
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

export { FilterableLyricsList };
