import * as errorIcon from '../assets/error.svg';

export default `
<div style="
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #355C7D;
  width: 100vw;
  height: 100vh;"
>
  <span style="
    color: #F67280;
    font-size: 28px;
    font-weight: 800;
  ">something went wrong!</span>
  <img style="
    max-width: 300px;
    max-height: 300px;
  " src=${errorIcon} />
</div>`;
