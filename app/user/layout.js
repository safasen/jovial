import NavigateBar from "../components/navigateBar";
export default function UserLayout({ children }) {
  return (
    <div>
      <NavigateBar />
      {children}
    </div>
  );
    
}