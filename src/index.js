import React, { Component } from 'react';
import { render } from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
const API_KEY = 'AIzaSyC5FZiC63AavS3TuAsAofHBLGAS6xPw4cI';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos:[],
      selectedVideo: null,
    };

    this.videoSearch('lofi');
  }
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos:videos,
        selectedVideo: videos[0],
      });
    });
  }
  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        />
      </div>
    )
  }
}

export default App;

render(
  <App />,
  document.getElementById('app')
)
