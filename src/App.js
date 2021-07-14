import { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import 'tachyons'
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: 'e9452b93c12f4a408ee7aa6b96fa9dc2'
 });

const particlesOptions = {
  "particles": {
      "number": {
          "density": {
            enable: true,
            vaule_area: 800
          },
          "value": 200
      },
      "size": {
          "value": 5
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      imgUrl: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  componentDidMount() {
    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(console.log)
  }


  setBox = (box) => {
    this.setState({box: box})
    console.log(this.state.box);
  }

  getBox = (response) => {
    const coor = response.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImage');
    const height = Number(img.height);
    const width = Number(img.width);
    console.log(coor);
    return {
      bottom_row: height - (coor.bottom_row * height),
      left_col: coor.left_col * width,
      right_col: width - (coor.right_col * width),
      top_row: coor.top_row * height,
    }
  } 
  

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    console.log(this.state.input);

    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      this.setBox(this.getBox(response))

      if(response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
        })
      })
        .then(res => res.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries : count }))
          console.log(this.state.user.entries)
        })
      }
      
    })
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    console.log(this.state.route)
  }


  render() {
    const { imgUrl, box, route, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
         params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} route={route}/>
        { route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} route={route}/>
          : ( route === 'register'
              ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} route={route}/>
              : <div>
                <Logo />
                <Rank name={user.name} entries={user.entries} />
                <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                /> 

                <FaceRecognition box={box} ImgUrl={imgUrl}/>
            </div> 
            )
        }
      </div>
    );
  }
}

export default App;
