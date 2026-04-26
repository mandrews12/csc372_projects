import pic from '../assets/client_headshot.png';
export default function About() {
    return (
        <section>
            <div class = "header-card">
                <h1>About Us</h1>
            </div>

            <div class = "card">
                <h1>About Critter Haven Crafts</h1>
                <hr></hr>
                <p>Critter Haven Crafts started as a hobby resulting from COVID and is dedicated to creating unique handmade crafts and products. My passion for crafting and creativity drives me to produce one-of-a-kind crafts, home decor, and gifts that are crafted with care and attention to detail.</p>
                <p>My inspiration comes from the beauty of nature, the joy of creativity, and the desire to bring something special into the lives of my customers. Each piece I create is made with love and a commitment to quality, ensuring that you receive a product that is not only beautiful but also meaningful.</p>
                <p>Thank you for visiting Critter Haven Crafts. I hope you find something that brings joy and inspiration into your life!</p>
            </div>

            <div class = "card">
                <img src={pic} alt="Photo of the Crafter" height="400"></img>
                <h1>Meet the Crafter</h1>
                <hr></hr>
                <p>My name is Sandy Andrews, and I am the crafter behind Critter Haven Crafts. I have always had a passion for creating and a love for handmade items. With years of experience in various crafting techniques, I started Critter Haven Crafts to share my creations with others and to bring a touch of handmade beauty into the world.</p>
                <p>When I'm not crafting, you can find me doing agility with my dog, riding my horse, seeking inspiration for new designs, or spending time with my family. I am excited to share these crafts with you.</p>
            </div>
    </section>
    );
}
