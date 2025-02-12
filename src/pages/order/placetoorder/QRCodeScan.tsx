// import { useEffect, useRef, useState } from "react";
// import {
//   BrowserMultiFormatReader,
//   BarcodeFormat,
//   DecodeHintType,
// } from "@zxing/library";

// const QRCodeScan = () => {
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const Camera = useRef<HTMLVideoElement>(null);
//   const [text, setText] = useState("");

//   const hints = new Map();
//   const formats = [
//     BarcodeFormat.QR_CODE,
//     BarcodeFormat.DATA_MATRIX,
//     BarcodeFormat.CODE_128,
//     BarcodeFormat.CODABAR,
//     BarcodeFormat.EAN_13,
//     BarcodeFormat.EAN_8,
//     BarcodeFormat.CODE_39,
//     BarcodeFormat.CODE_93,
//   ];
//   hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
//   const Scan = new BrowserMultiFormatReader(hints, 500);

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({
//         video: { facingMode: "user" }, // 전면 카메라
//       })
//       .then(stream => {
//         setLocalStream(stream);
//       })
//       .catch(error => {
//         console.error("Error accessing camera:", error);
//       });

//     return () => {
//       Stop();
//     };
//   }, []);

//   useEffect(() => {
//     if (Camera.current && localStream) {
//       Camera.current.srcObject = localStream; // 비디오 요소에 스트림 연결
//       Scanning();
//     }
//   }, [localStream]);

//   const Scanning = () => {
//     if (localStream && Camera.current) {
//       try {
//         Scan.decodeFromStream(localStream, Camera.current, (result, error) => {
//           if (result) {
//             setText(result.getText()); // 스캔 결과 표시
//           } else if (error) {
//             console.error(error);
//             setText(""); // 에러 발생 시 텍스트 초기화
//           }
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const Stop = () => {
//     if (localStream) {
//       const vidTrack = localStream.getVideoTracks();
//       vidTrack.forEach(track => {
//         track.stop(); // 트랙 정지
//       });
//     }
//     if (Scan) {
//       Scan.reset(); // 스캐너 리소스 정리
//     }
//   };

//   return (
//     <div>
//       <video ref={Camera} id="video" autoPlay muted playsInline />
//       <span>{text}</span>
//     </div>
//   );
// };

// export default QRCodeScan;
