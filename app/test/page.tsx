const EnvTest = () => {
  return (
    <div>
      <p>Project ID: {process.env.NEXT_PUBLIC_PROJECT_ID}</p>
    </div>
  );
};

export default EnvTest;
