function Contact() {
    // Need to write functions for forms
  return (
    <div>
      <h2>Contact Us</h2>
        <div>
          <form onSubmit={handleFormSubmit}>
            <label>Name: </label>
            <input /> {/* need to add in */}
            <label>Email: </label>
            <input /> {/* need to add in */}
          </form>
        </div>
    </div>
  )
}

export default Contact;