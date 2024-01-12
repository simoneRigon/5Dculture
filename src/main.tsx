import { bootstrapCameraKit, Transform2D, createMediaStreamSource } from '@snap/camera-kit';
import './main.css';

(async function () {
  const carosel_item_div = document.getElementById('carosel-items-div') as HTMLBaseElement; 
  const snapchat_main_div = document.getElementById('snapchat-main-div') as HTMLBaseElement;
  const lens_name = document.getElementById('carosel-text') as HTMLTextAreaElement;

  const carosel_item_01 = document.getElementById('carosel-item-01') as HTMLBaseElement;
  const carosel_item_02 = document.getElementById('carosel-item-02') as HTMLBaseElement;
  const carosel_item_03 = document.getElementById('carosel-item-03') as HTMLBaseElement;
  const carosel_item_04 = document.getElementById('carosel-item-04') as HTMLBaseElement;

  // const max_group_lens = 5;
  var lens_id = 0;

  const cameraKit = await bootstrapCameraKit({apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjk3MTE5NjA0LCJzdWIiOiI4ZDZkZDQ0ZS04YTE3LTRlNWYtOGUwMC1kMGNlOTM5ZTljNDh-U1RBR0lOR34zNWMyNmU2NS01YTk1LTQyNDAtYTFhMS0zMzAwYmY2NTk2ZDQifQ.LoQ3TSICRZxnc4HAEP_VmIDPoL3bXG552s1MUQz8SUQ'});

  const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
  const session = await cameraKit.createSession( {liveRenderTarget} );
  
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const source = createMediaStreamSource(stream, { transform: Transform2D.MirrorX, cameraType: 'front' });

  await session.setSource(source);
  // await source.setRenderSize(480, 620);

  console.log(stream.getVideoTracks()[0].getSettings().width)

  await session.play();

  const { lenses } = await cameraKit.lensRepository.loadLensGroups([
    '5407fd78-3206-4dd5-b65e-7ce308721bc5'
  ]);
  await session.applyLens(lenses[lens_id]);
  lens_name.innerHTML = lenses[lens_id].name;

  // Add OnClick Event on each carosel item ----
  // Green Hat
  carosel_item_01.onclick = function() {
    carosel_item_div.style.display = "none";
    snapchat_main_div.style.display = "block";

    lens_id = 0;
    session.applyLens(lenses[lens_id]);
    lens_name.innerHTML = lenses[lens_id].name;
  }

  // Vivian Westwood
  carosel_item_02.onclick = function() {
    carosel_item_div.style.display = "none";
    snapchat_main_div.style.display = "block";

    lens_id = 1;
    session.applyLens(lenses[lens_id]);
    lens_name.innerHTML = lenses[lens_id].name;
  }

  // Herenhoed
  carosel_item_03.onclick = function() {
    carosel_item_div.style.display = "none";
    snapchat_main_div.style.display = "block";

    lens_id = 3;
    session.applyLens(lenses[lens_id]);
    lens_name.innerHTML = lenses[lens_id].name;
  }

  // Sunglass - Zonnebril
  carosel_item_04.onclick = function() {
    carosel_item_div.style.display = "none";
    snapchat_main_div.style.display = "block";

    lens_id = 2;
    session.applyLens(lenses[lens_id]);
    lens_name.innerHTML = lenses[lens_id].name;
  }
})();