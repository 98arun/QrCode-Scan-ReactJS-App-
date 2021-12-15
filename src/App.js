import React, { useState, useRef } from "react";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";

function App() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const classes = useStyles();
  const qrRef = useRef(null);

  const _generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log("LN27 error in generateQrCode", error);
    }
  };

  const _handleErrorFile = (error) => {
    console.log("LN32 error in Scan QrCode", error);
  };

  const _handleScanFile = (result) => {
    if (!result) {
      return;
    }
    setScanResultFile(result);
  };

  const _onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  const _handleErrorWebCam = (error) => {
    console.log("LN47 error in QrCode Scan by WebCam", error);
  };

  const _handleScanWebCam = (result) => {
    if (!result) {
      return;
    }
    setScanResultWebCam(result);
  };
  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>
          Generate, Download & Scan QRCode with ReactJS
        </h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField
                label="Enter Text Here"
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => _generateQrCode()}
              >
                Generate
              </Button>
              <br />
              <br />
              <br />
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>
              ) : null}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={_onScanFile}
              >
                Scan Downloaded QrCode
              </Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: "100%" }}
                onError={_handleErrorFile}
                onScan={_handleScanFile}
                legacyMode
              />
              <h3>Scanned Downloaded Code Details: {scanResultFile}</h3>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>QrCode Scan by WebCam</h3>
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={_handleErrorWebCam}
                onScan={_handleScanWebCam}
              />
              <h3>Scanned By WebCam Code Details: {scanResultWebCam}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));

export default App;
