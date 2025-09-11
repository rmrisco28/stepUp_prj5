import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import "../../css/competencyEditor.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "scroll",
};

export function CompetencyEditor() {
  const [sendData, setSendData] = useState();

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => {
    const mailBody = document
      .getElementById("iframeContainer_iframe")
      .contentWindow.submitPost();

    setSendData(mailBody);

    setOpen2(true);
  };
  const handleClose2 = () => setOpen2(false);

  return (
    <>
      <div className="iframeWrapper">
        <div id="container" className="iframeContainer">
          <iframe
            id="iframeContainer_iframe"
            allowFullScreen={true}
            name="myframe"
            frameBorder={"0"}
            src="/../public/smarteditor/write.html"
          ></iframe>
          <Button variant="outlined" onClick={handleOpen2}>
            미리보기
          </Button>
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div sx={style}>
              <div dangerouslySetInnerHTML={{ __html: sendData }}></div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
