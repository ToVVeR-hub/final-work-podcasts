type Props = React.SVGProps<SVGSVGElement>;

export const PauseIcon = (props: Props) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="7" y="4.5" width="4" height="15" rx="2" fill="currentColor" />
    <rect x="13" y="4.5" width="4" height="15" rx="2" fill="currentColor" />
  </svg>
);
