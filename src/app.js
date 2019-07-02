import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default class extends React.Component {
  state = {
    src: null,
    crop: {
      aspect: 1,
      unit: "%",
      x: 25,
      y: 0,
      width: 100
    },
    croppedImage: null
  };

  image = null;

  onChangeFile = e => {
    let reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  save = () => {
    this.setState({ src: this.getCroppedImage() });
  };

  getCroppedImage = () => {
    const {
      crop: { x, y, width, height }
    } = this.state;
    console.log(height, width);
    let canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);
    return canvas.toDataURL("png");
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
          onComplete={crop => console.log(crop)}
          onChange={crop => this.setState({ crop })}
        />
        <img src={this.state.src} height="100" alt="hell" />
        <input type="button" onClick={this.save} value="Save" />
      </div>
    );
  }
}
