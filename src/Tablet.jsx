import { useAuth } from "./AuthContext";
// import { useState } from "react";
export default function Tablet() {
  // TODO: call authenticate when form is submitted
    const { authenticate } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await authenticate();
    if (result && result.success) {
      console.log("authenticate completed successfully")
    } else {
      console.error("authentication failed:", result.message)
    }
  }
  return (
    <section>
      <p>
        The sound of your name thuds against the gate as the two badgers furrow
        their brows. The badger on the right beckons you to approach.
      </p>
      <p>"Only those who are pure of heart may pass."</p>
      <p>
        "Place your hand upon this stone tablet, and thus will your true self be
        revealed."
      </p>
      <p>
        It holds out a rectangular stone tablet carved with an intricate design.
      </p>
      <form>
        <button onClick={handleSubmit}>Place your palm upon the tablet.</button>
      </form>
    </section>
  );
}
