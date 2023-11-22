import Proptypes from "prop-types";
import React from "react";

const SchoolIcon = ({ width = 41, height = 40 }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.25 7C7.9743 7 7.75 6.7757 7.75 6.5C7.75 6.22428 7.9743 6 8.25 6C8.5257 6 8.75 6.22428 8.75 6.5C8.75 6.7757 8.5257 7 8.25 7Z"
      fill="#CACAFB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.25 35C2.9743 35 2.75 34.7757 2.75 34.5C2.75 34.2243 2.9743 34 3.25 34C3.5257 34 3.75 34.2243 3.75 34.5C3.75 34.7757 3.5257 35 3.25 35Z"
      fill="#CACAFB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.25 32C37.9743 32 37.75 31.7757 37.75 31.5C37.75 31.2243 37.9743 31 38.25 31C38.5257 31 38.75 31.2243 38.75 31.5C38.75 31.7757 38.5257 32 38.25 32Z"
      fill="#CACAFB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30.25 6C29.9743 6 29.75 5.7757 29.75 5.5C29.75 5.22428 29.9743 5 30.25 5C30.5257 5 30.75 5.22428 30.75 5.5C30.75 5.7757 30.5257 6 30.25 6Z"
      fill="#CACAFB"
    />
    <path
      d="M7.75318 18.8011C7.79312 18.3392 8.20444 18 8.67857 18H10.25L10.3083 18.0034C10.557 18.0322 10.75 18.2436 10.75 18.5L10.7466 18.5583C10.7178 18.807 10.5064 19 10.25 19H8.75V21H10.25L10.3083 21.0034C10.557 21.0322 10.75 21.2436 10.75 21.5C10.75 21.7761 10.5261 22 10.25 22H8.67857L8.60428 21.9972C8.13761 21.9621 7.75 21.5992 7.75 21.125V18.875L7.75318 18.8011Z"
      fill="#E1000F"
    />
    <path
      d="M14.7468 18.8011C14.7069 18.3392 14.2956 18 13.8214 18H12.25L12.1917 18.0034C11.943 18.0322 11.75 18.2436 11.75 18.5L11.7534 18.5583C11.7822 18.807 11.9936 19 12.25 19H13.75V21H12.25L12.1917 21.0034C11.943 21.0322 11.75 21.2436 11.75 21.5C11.75 21.7761 11.9739 22 12.25 22H13.8214L13.8957 21.9972C14.3624 21.9621 14.75 21.5992 14.75 21.125V18.875L14.7468 18.8011Z"
      fill="#E1000F"
    />
    <path
      d="M32.8214 18C33.2956 18 33.7069 18.3392 33.7468 18.8011L33.75 18.875V21.125C33.75 21.5992 33.3624 21.9621 32.8957 21.9972L32.8214 22H31.25C30.9739 22 30.75 21.7761 30.75 21.5C30.75 21.2436 30.943 21.0322 31.1917 21.0034L31.25 21H32.75V19H31.25C30.9936 19 30.7822 18.807 30.7534 18.5583L30.75 18.5C30.75 18.2436 30.943 18.0322 31.1917 18.0034L31.25 18H32.8214Z"
      fill="#E1000F"
    />
    <path
      d="M26.7532 18.8011C26.7931 18.3392 27.2044 18 27.6786 18H29.25L29.3083 18.0034C29.557 18.0322 29.75 18.2436 29.75 18.5L29.7466 18.5583C29.7178 18.807 29.5064 19 29.25 19H27.75V21H29.25L29.3083 21.0034C29.557 21.0322 29.75 21.2436 29.75 21.5C29.75 21.7761 29.5261 22 29.25 22H27.6786L27.6043 21.9972C27.1376 21.9621 26.75 21.5992 26.75 21.125V18.875L26.7532 18.8011Z"
      fill="#E1000F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.75 24C7.19772 24 6.75 24.4477 6.75 25V28C6.75 28.5523 7.19772 29 7.75 29H9.75C10.3023 29 10.75 28.5523 10.75 28V25C10.75 24.4477 10.3023 24 9.75 24H7.75ZM9.75 28V25H7.75V28H9.75Z"
      fill="#E1000F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.75 24C12.1977 24 11.75 24.4477 11.75 25V28C11.75 28.5523 12.1977 29 12.75 29H14.75C15.3023 29 15.75 28.5523 15.75 28V25C15.75 24.4477 15.3023 24 14.75 24H12.75ZM14.75 28V25H12.75V28H14.75Z"
      fill="#E1000F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.75 24C26.1977 24 25.75 24.4477 25.75 25V28C25.75 28.5523 26.1977 29 26.75 29H28.75C29.3023 29 29.75 28.5523 29.75 28V25C29.75 24.4477 29.3023 24 28.75 24H26.75ZM28.75 28V25H26.75V28H28.75Z"
      fill="#E1000F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.75 24C31.1977 24 30.75 24.4477 30.75 25V28C30.75 28.5523 31.1977 29 31.75 29H33.75C34.3023 29 34.75 28.5523 34.75 28V25C34.75 24.4477 34.3023 24 33.75 24H31.75ZM33.75 28V25H31.75V28H33.75Z"
      fill="#E1000F"
    />
    <path
      d="M18.6036 6.14645C18.4083 5.95118 18.0917 5.95118 17.8964 6.14645L10.8964 13.1464L10.8549 13.1936C10.7023 13.3897 10.7162 13.6733 10.8964 13.8536C11.0917 14.0488 11.4083 14.0488 11.6036 13.8536L18.6036 6.85355L18.6451 6.80645C18.7977 6.6103 18.7838 6.32669 18.6036 6.14645Z"
      fill="#000091"
    />
    <path
      d="M21.0424 7.09438C20.8509 6.95596 20.5838 6.9698 20.4073 7.1359L15.0591 12.1695L15.0161 12.2154C14.8577 12.4068 14.863 12.6907 15.0377 12.8763L15.0835 12.9193C15.2749 13.0777 15.5588 13.0724 15.7444 12.8977L20.7495 8.1865L28.7629 15.7282L28.8269 15.7835C29.003 15.9232 29.2219 16 29.4483 16H34.25L34.3083 15.9966C34.557 15.9678 34.75 15.7564 34.75 15.5C34.75 15.2239 34.5261 15 34.25 15H29.4483L21.0927 7.1359L21.0424 7.09438Z"
      fill="#000091"
    />
    <path
      d="M36.25 15C35.9936 15 35.7822 15.193 35.7534 15.4417L35.75 15.5V32H31.25C30.9936 32 30.7822 32.193 30.7534 32.4417L30.75 32.5C30.75 32.7564 30.943 32.9678 31.1917 32.9966L31.25 33H36.25C36.5064 33 36.7178 32.807 36.7466 32.5583L36.75 32.5V15.5C36.75 15.2239 36.5261 15 36.25 15Z"
      fill="#000091"
    />
    <path
      d="M11.25 32C11.5261 32 11.75 32.2239 11.75 32.5C11.75 32.7564 11.557 32.9678 11.3083 32.9966L11.25 33H7.25C6.97386 33 6.75 32.7761 6.75 32.5C6.75 32.2436 6.94302 32.0322 7.19169 32.0034L7.25 32H11.25Z"
      fill="#000091"
    />
    <path
      d="M5.75 32.5C5.75 32.7761 5.52614 33 5.25 33C4.97386 33 4.75 32.7761 4.75 32.5C4.75 32.2239 4.97386 32 5.25 32C5.52614 32 5.75 32.2239 5.75 32.5Z"
      fill="#000091"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.75 30.5C26.75 30.2239 26.5261 30 26.25 30H24.75V22.5L24.7466 22.4417C24.7178 22.193 24.5064 22 24.25 22H17.25L17.1917 22.0034C16.943 22.0322 16.75 22.2436 16.75 22.5V30H15.25L15.1917 30.0034C14.943 30.0322 14.75 30.2436 14.75 30.5C14.75 30.7761 14.9739 31 15.25 31H26.25L26.3083 30.9966C26.557 30.9678 26.75 30.7564 26.75 30.5ZM21.25 25.5V30H23.75V22.9995H17.75V30H20.25V25.5C20.25 25.2239 20.4739 25 20.75 25C21.0064 25 21.2178 25.193 21.2466 25.4417L21.25 25.5Z"
      fill="#000091"
    />
    <path
      d="M21.25 15C21.5261 15 21.75 15.2239 21.75 15.5C21.75 15.7564 21.557 15.9678 21.3083 15.9966L21.25 16H20.25C19.9936 16 19.7822 15.807 19.7534 15.5583C19.7511 15.5392 19.75 15.5197 19.75 15.5V14.5C19.75 14.2239 19.9739 14 20.25 14C20.5064 14 20.7178 14.193 20.7466 14.4417L20.75 14.5V15H21.25Z"
      fill="#000091"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.75 15C17.75 13.3431 19.0931 12 20.75 12C22.4069 12 23.75 13.3431 23.75 15C23.75 16.6569 22.4069 18 20.75 18C19.0931 18 17.75 16.6569 17.75 15ZM20.75 13C21.8546 13 22.75 13.8954 22.75 15C22.75 16.1046 21.8546 17 20.75 17C19.6454 17 18.75 16.1046 18.75 15C18.75 13.8954 19.6454 13 20.75 13Z"
      fill="#000091"
    />
    <path
      d="M23.75 20.5C23.75 20.2239 23.5261 20 23.25 20H18.25L18.1917 20.0034C17.943 20.0322 17.75 20.2436 17.75 20.5C17.75 20.7761 17.9739 21 18.25 21H23.25L23.3083 20.9966C23.557 20.9678 23.75 20.7564 23.75 20.5Z"
      fill="#000091"
    />
    <path
      d="M28.75 32.5C28.75 32.2239 28.5261 32 28.25 32H13.25L13.1917 32.0034C12.943 32.0322 12.75 32.2436 12.75 32.5C12.75 32.7761 12.9739 33 13.25 33H28.25L28.3083 32.9966C28.557 32.9678 28.75 32.7564 28.75 32.5Z"
      fill="#000091"
    />
    <path
      d="M12.8964 14.1464C13.0917 13.9512 13.4083 13.9512 13.6036 14.1464C13.7838 14.3267 13.7977 14.6103 13.6451 14.8064L13.6036 14.8536L12.6036 15.8536C12.5254 15.9317 12.4241 15.9813 12.3157 15.9957L12.25 16H5.75V30.5C5.75 30.7564 5.55698 30.9678 5.30831 30.9966L5.25 31C4.99358 31 4.78225 30.807 4.75336 30.5583L4.75 30.5V15.5C4.75 15.2436 4.94302 15.0322 5.19169 15.0034L5.25 15H12.042L12.8964 14.1464Z"
      fill="#000091"
    />
    <path
      d="M34.25 13C34.5261 13 34.75 13.2239 34.75 13.5C34.75 13.7564 34.557 13.9678 34.3083 13.9966L34.25 14H30.25C29.9739 14 29.75 13.7761 29.75 13.5C29.75 13.2436 29.943 13.0322 30.1917 13.0034L30.25 13H34.25Z"
      fill="#000091"
    />
    <path
      d="M36.25 14C36.5261 14 36.75 13.7761 36.75 13.5C36.75 13.2239 36.5261 13 36.25 13C35.9739 13 35.75 13.2239 35.75 13.5C35.75 13.7761 35.9739 14 36.25 14Z"
      fill="#000091"
    />
  </svg>
);

SchoolIcon.propTypes = {
  height: Proptypes.number,
  width: Proptypes.number,
};

export default SchoolIcon;
