function Home() {

    return (
        <div className='fixed inset-0 w-full bg-cover -z-10'>
            <video loop autoPlay muted>
                <source src="https://ipa-videos.s3.amazonaws.com/IPA_Video_720.mp4" type="video/mp4" ></source>
            </video>
        </div>
      );
};

export default Home;