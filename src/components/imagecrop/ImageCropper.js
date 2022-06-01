import React, { Fragment } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "./imagecrop.css";

class ImageCropper extends React.Component {
  constructor() {
    super();
    this.state = {
      imageDestination: "",
      mounted: true,
    };
    this.imageElement = React.createRef();
  }

  componentDidMount() {
    const cropper = new Cropper(this.imageElement.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        sessionStorage.setItem("image", canvas.toDataURL("image/png"));
        this.setState({ imageDestination: canvas.toDataURL("image/png") });
      },
    });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  render() {
    return (
      <Fragment>
        {this.state.mounted ? (
          <div>
            <div className="img-container">
              <img ref={this.imageElement} src={this.props.src} alt="Source" />
            </div>
            <img
              src={this.state.imageDestination}
              className="img-preview"
              alt="Destination"
            />
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default ImageCropper;
