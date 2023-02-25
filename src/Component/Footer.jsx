import "../Style/footer.css"
function Footer() {
    const version = 2.0;
    const date = new Date().toLocaleDateString();
  return (
    <>
      <p className="footerVersion">Version : {version} {date}</p>
    </>
  );
}

export default Footer;
