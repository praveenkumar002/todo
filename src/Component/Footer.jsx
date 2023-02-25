import "../Style/footer.css"
function Footer() {
    const version = 2.1;
    const date = new Date().toLocaleDateString();
  return (
    <>
      <p className="footerVersion">Version:{version.toFixed(1)} {date}</p>
    </>
  );
}

export default Footer;
