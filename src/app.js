import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default class extends React.Component {
  image = null;
  heightRatio = 1;
  widthRatio = 1;
  state = {
    src: null,
    crop: {
      aspect: 1,
      unit: "%",
      x: 0,
      y: 0,
      width: 50,
      height: 50
    },
    croppedImage: null
  };

  onChangeFile = e => {
    let reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  save = () => {
    this.setState({ croppedImage: this.drawImage() });
  };

  createCanvas = () => {
    const {
      crop: { width, height }
    } = this.state;
    const {
      clientWidth,
      clientHeight,
      naturalWidth,
      naturalHeight
    } = this.image;
    this.heightRatio = naturalHeight / clientHeight;
    this.widthRatio = naturalWidth / clientWidth;
    let c = document.createElement("canvas");
    c.height = height * this.heightRatio;
    c.width = width * this.widthRatio;
    return c;
  };

  drawImage = () => {
    let c = this.createCanvas();
    let ctx = c.getContext("2d");
    const { image, state, widthRatio, heightRatio } = this;
    let {
      crop: { x, y, width, height }
    } = state;
    let resultHeight = height * heightRatio;
    let resultWidth = width * widthRatio;
    ctx.drawImage(
      image,
      x * widthRatio,
      y * heightRatio,
      resultWidth,
      resultHeight,
      0,
      0,
      resultWidth,
      resultHeight
    );
    return c.toDataURL("image/jpeg", 1.0);
  };

  render() {
    const { crop, src } = this.state;
    return (
      <div>
        <input type="file" onChange={this.onChangeFile} />
        <ReactCrop
          src={src}
          crop={crop}
          onImageLoaded={image => {
            console.dir(image);
            this.image = image;
          }}
          // onComplete={this.save}
          onChange={crop => this.setState({ crop }, this.save)}
        />
        <img src={this.state.croppedImage} height="250" alt="hell" />
        {/* <input type="button" onClick={this.save} value="Save" /> */}
      </div>
    );
  }
}
