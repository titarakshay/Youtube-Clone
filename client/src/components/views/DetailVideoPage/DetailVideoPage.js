import React, { useEffect, useState } from "react";
import { List, Avatar, Col, Row } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideoPage";
import Subscriber from "./Sections/Subscriber";

function DetailVideoPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);
  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data.video);
        setVideo(response.data.video);
      } else {
        alert("Failed to get video Info");
      }
    });
  }, []);
  if (Video.writer) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4em" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>
            <List.Item
              actions={[
                <Subscriber
                  userTo={Video.writer}
                  userFrom={localStorage.getItem("userId")}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<a href="#">{Video.title}</a>}
                description={Video.description}
              />
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading ....</div>;
  }
}

export default DetailVideoPage;
