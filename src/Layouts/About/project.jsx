import React, { Component } from 'react';

class AboutProject extends Component {
  render() {
      const aboutHeadline = "About the Project";
      const aboutText = "After the slave trade to the US was outlawed in 1808, Africans were smuggled into the country (a tricky process), they were bred (which depended on the human life cycle), and they were rented (so the people who treated them as property could make as much money as possible). People who rented slaves insured them so that these valuable assets would not be destroyed while in someone else's possession. " 
      + "<br> Legally slaves were property. But, no other form of property could enhance its value through the skills it acquired. In addition to information on enslaved workers, the Treasury of Weary Souls contains data on the financial firms who acquired slave insurance policies during the 20th century and continue to profit from them today. ";
        return (
            <section id="about" className="about-project-container">
                <h2>{ aboutHeadline }</h2>
                <p>{ aboutText }</p>
            </section>
        )
    }
}

export default AboutProject;