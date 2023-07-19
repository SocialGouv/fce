import Proptypes from "prop-types";
import React from "react";

const EffectifIcon = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 7C7.2243 7 7 6.7757 7 6.5C7 6.22428 7.2243 6 7.5 6C7.7757 6 8 6.22428 8 6.5C8 6.7757 7.7757 7 7.5 7Z"
      fill="#CACAFB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.5 35C2.2243 35 2 34.7757 2 34.5C2 34.2243 2.2243 34 2.5 34C2.7757 34 3 34.2243 3 34.5C3 34.7757 2.7757 35 2.5 35Z"
      fill="#CACAFB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M37.5 32C37.2243 32 37 31.7757 37 31.5C37 31.2243 37.2243 31 37.5 31C37.7757 31 38 31.2243 38 31.5C38 31.7757 37.7757 32 37.5 32Z"
      fill="#CACAFB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.5 6C29.2243 6 29 5.7757 29 5.5C29 5.22428 29.2243 5 29.5 5C29.7757 5 30 5.22428 30 5.5C30 5.7757 29.7757 6 29.5 6Z"
      fill="#CACAFB"
    />
    <path
      d="M21.0739 5C29.3582 5 36.0739 11.7157 36.0739 20C36.0739 20.2761 35.8501 20.5 35.5739 20.5C35.2978 20.5 35.0739 20.2761 35.0739 20C35.0739 12.268 28.8059 6 21.0739 6C13.3419 6 7.07393 12.268 7.07393 20C7.07393 27.732 13.3419 34 21.0739 34C26.6513 34 31.6275 30.7087 33.8631 25.7042C33.9758 25.452 34.2715 25.3389 34.5236 25.4516C34.7757 25.5642 34.8888 25.8599 34.7762 26.112C32.3811 31.4736 27.0494 35 21.0739 35C12.7897 35 6.07393 28.2843 6.07393 20C6.07393 11.7157 12.7897 5 21.0739 5Z"
      fill="#E1000F"
    />
    <path
      d="M35.5739 24.2963C35.5739 24.5929 35.3335 24.8333 35.0369 24.8333C34.7403 24.8333 34.4999 24.5929 34.4999 24.2963C34.4999 23.9997 34.7403 23.7593 35.0369 23.7593C35.3335 23.7593 35.5739 23.9997 35.5739 24.2963Z"
      fill="#E1000F"
    />
    <path
      d="M7.24644 10.516C7.02672 10.3488 6.71301 10.3913 6.54574 10.611C4.85592 12.8307 3.92578 15.5399 3.92578 18.3889C3.92578 18.665 4.14964 18.8889 4.42578 18.8889C4.70192 18.8889 4.92578 18.665 4.92578 18.3889C4.92578 15.7606 5.78301 13.2638 7.34141 11.2167C7.50868 10.997 7.46616 10.6833 7.24644 10.516Z"
      fill="#E1000F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.9983 17.4585C27.6434 13.1997 25.2604 11 21 11C16.7396 11 14.3566 13.1997 14.0017 17.4585C13.9749 17.7808 14.2564 18.0434 14.576 17.9942L15.5 17.852V18.0705C15.1421 18.1395 14.8783 18.2349 14.6934 18.3728C14.2244 18.7225 14 19.2816 14 20C14 21.2761 14.7238 22 16 22C16.0544 22 16.1068 21.9913 16.1558 21.9752C16.6878 23.0066 17.5123 23.8494 18.5143 24.381C18.5049 24.4191 18.5 24.459 18.5 24.5C18.5 25.1493 18.1906 25.7264 17.7111 26.0918C17.7033 26.0972 17.6958 26.1029 17.6884 26.1088C17.3562 26.3546 16.9451 26.5 16.5 26.5H15.5L15.3875 26.5021C13.7828 26.5612 12.5 27.8808 12.5 29.5C12.5 29.7761 12.7239 30 13 30C13.2761 30 13.5 29.7761 13.5 29.5C13.5 28.3954 14.3954 27.5 15.5 27.5H16.5L16.6125 27.4979C17.0307 27.4825 17.427 27.3815 17.7845 27.2119C18.3205 28.0556 19.3092 28.3131 20.6213 27.9851C20.8892 27.9181 21.052 27.6466 20.9851 27.3787C20.9181 27.1108 20.6466 26.948 20.3787 27.0149C19.4439 27.2486 18.8978 27.1221 18.6065 26.636C19.0958 26.1534 19.4201 25.504 19.4871 24.7799C19.9676 24.9232 20.4751 25 21 25C21.5249 25 22.0324 24.9232 22.5129 24.7799C22.6507 26.2688 23.8763 27.4422 25.3875 27.4979L25.5 27.5H26.5C27.6046 27.5 28.5 28.3954 28.5 29.5C28.5 29.7761 28.7239 30 29 30C29.2761 30 29.5 29.7761 29.5 29.5C29.5 27.8808 28.2172 26.5612 26.6125 26.5021L26.5 26.5H25.5C24.3954 26.5 23.5 25.6046 23.5 24.5C23.5 24.459 23.4951 24.4191 23.4857 24.381C24.4877 23.8494 25.3122 23.0066 25.8441 21.9752C25.8932 21.9913 25.9456 22 26 22C27.2761 22 28 21.2761 28 20C28 19.2816 27.7755 18.7225 27.3066 18.3728C27.0538 18.1843 26.6536 18.0751 26.0672 18.0045C26.0458 18.0016 26.024 18.0001 26.0019 18L26.0011 18C25.9528 17.9998 25.9058 18.0066 25.8611 18.0195C25.7891 18.0403 25.7237 18.0769 25.6691 18.1252C25.5723 18.2107 25.5089 18.333 25.5009 18.4703C25.5001 18.4828 25.4998 18.4953 25.5 18.5077V19.25L25.4981 19.3879C25.429 21.9524 23.4362 24 21 24C18.5203 24 16.5 21.8787 16.5 19.25V17.6982L21.076 16.9942L21.135 16.9814C21.2699 16.9436 21.3838 16.8505 21.4472 16.7236L21.9472 15.7236L21.9703 15.6699C22.0557 15.4346 21.953 15.1675 21.7236 15.0528L21.6699 15.0297C21.4346 14.9443 21.1675 15.047 21.0528 15.2764L20.668 16.045L15.07 16.906L15.0791 16.8416C15.5691 13.5755 17.5017 12 21 12L21.1796 12.0014C24.5052 12.0539 26.3731 13.577 26.8943 16.6742L26.92 16.8395L23.6213 16.0149L23.5639 16.004C23.3156 15.9718 23.0771 16.13 23.0149 16.3787C22.948 16.6466 23.1108 16.9181 23.3787 16.9851L27.3787 17.9851L27.4371 17.9961C27.7471 18.0364 28.0251 17.7798 27.9983 17.4585ZM15.5 19.0951C15.3939 19.1229 15.3232 19.1506 15.2911 19.1745C15.1037 19.3142 15 19.5726 15 20C15 20.6359 15.2131 20.9263 15.7557 20.9875C15.6032 20.4839 15.5152 19.9506 15.5018 19.3982L15.5 19.25V19.0951ZM27 20C27 20.6359 26.7869 20.9263 26.2443 20.9875C26.4104 20.4391 26.5 19.8553 26.5 19.25V19.0951C26.606 19.1229 26.6768 19.1506 26.7089 19.1745C26.8963 19.3142 27 19.5726 27 20Z"
      fill="#000091"
    />
  </svg>
);

EffectifIcon.propTypes = {
  size: Proptypes.number,
};

export default EffectifIcon;
