import React from 'react';
import './App.css';
import Menu from './Menu';
import List from './List';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      books:[
        {id:0, rating: 4, title: 'Alien, the eight passenger', image: 'Alien.jpg'},
        {id:1, rating: 3, title: 'Dracula', image: 'Dracula.jpg'},
        {id:2, rating: 5, title: 'Friday the 13th', image: 'Friday-the-13th.jpg'},
        {id:3, rating: 5, title: 'Halloween', image: 'Halloween.jpg'},
        {id:4, rating: 5, title: 'Nigthmare on Elm Street', image: 'Nigthmare-on-Elm-Street.jpg'},
        {id:5, rating: 3, title: 'Jaws', image: 'jaws.jpg'},
        {id:6, rating: 3, title: 'Rosemary-s baby', image: 'rosemary-s-baby.jpg'},
        {id:7, rating: 3, title: 'Saw', image: 'Saw.jpg'},
        {id:8, rating: 3, title: 'Scream', image: 'Scream.jpg'},
        {id:9, rating: 3, title: 'The Texas Chain Saw Massacre', image: 'The_Texas_Chain_Saw_Massacre.jpg'},
        {id:10, rating: 3, title: 'The conjuring', image: 'The-conjuring.jpg'},
        {id:11, rating: 3, title: 'The shining', image: 'The-shining.jpg'},
      ],
      copyBooks: []
    };

    this.onSearch = this.onSearch.bind(this);
    this.addItem = this.addItem.bind(this);
    this.remove = this.remove.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

  initBooks(){
    //this.setState({copyBooks: [...this.state.books]});
    this.setState((state,props) => ({
      copyBooks: [...state.books]
    }));
  }

  componentDidMount(){
    this.initBooks();
  }

  onSearch(query){
    if(query === ''){
      this.setState({copyBooks: [...this.state.books]});
    }else{

      const temp = [...this.state.books];
      var res = [];
      temp.forEach(item =>{
        if(item.title.toLowerCase().indexOf(query) > -1){
          res.push(item);
        }
      });
    
      this.setState({copyBooks: [...res]});
    }
  }

  addItem(item){
    var temp = [...this.state.books];
    const id = temp[temp.length-1].id + 1;
    item['id'] = id;
    temp.push(item);
    this.setState({books: [...temp]});
    this.initBooks();
  }

  remove(id){
    var temp = [...this.state.books];
    const res = temp.filter(item => item.id !== id);
    this.setState({books: [...res]});
    this.initBooks();
  }

  updateRating(item){
    var temp = [...this.state.books];
    const index = temp.findIndex(x => x.id === item.id);
    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({books: [...temp]});
    this.initBooks();
  }

  render(){
    return (
      <div className="app">
        <Menu title="Classic horror" onsearch={this.onSearch} onadd={this.addItem} />
        <List className="list" items={this.state.copyBooks} onremove={this.remove} onupdaterating={this.updateRating} />
      </div>
    );
  }
}

export default App;
