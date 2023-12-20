
export const GlobalStyle = () => {
  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
        h1, h2 {
          color: red;
          font-family: sans-serif;
        }
      `}</style>
    </>
  );
}
