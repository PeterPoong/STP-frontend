import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  .text-justify {
    text-align: justify;
    line-height: 1.5;
  }
  .list-spacing {
    line-height: 2 !important;
    text-align: justify;
  }
`;

const Term = () => {
  return (
    <Container className="py-5 ubuntu-font">
      <Row className="justify-content-center">
        <Col lg={10}>
          <StyledCard className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Terms and Conditions</h2>
              
              <p className="lead text-justify">Dear Readers & Users of StudyPal.my,</p>
              <p className="fw-bold text-justify">PLEASE READ THESE TERMS OF USE CAREFULLY.</p>

              <div className="mb-4">
                <p className="text-justify">
                The government of Malaysia has introduced the Personal Data Protection Act 2010 which applies to all companies established in the country. As such, we are required to inform you of your rights regarding the data that is being processed, being collected, and further processed as well as the purposes of the data processing.
                </p>
                <p className="text-justify">The Act also states that we are to obtain your consent to the processing of your data.</p>
              </div>

              <div className="mb-4">
                <p className="text-justify">Imedia Enterprise respects the privacy of our customers and users of this site (StudyPal.my). Hence, we wish to inform you that the personal data provided in your application to acquire information or content is being, and will likely continue to be used and processed by Imedia Enterprise for the following purposes:</p>
                <ol className="list-spacing">
                  <li className="text-justify">to provide you with news updates</li>
                  <li className="text-justify">to respond to your inquiries</li>
                  <li className="text-justify">to share with schools in providing further</li>
                </ol>
              </div>
            
                <p className="text-justify">
                Processing your data for all the above purposes is necessary for us to continue providing you with good service. Please take note that we may need to share your details with some higher education institutions whom we believe will be able to provide further information on the course you requested. By registering on the site, you agree to and undertake to comply with the terms above in respect to our processing of your personal data.
                </p>
                <p className="text-justify">
                Imedia Enterprise may change these terms without prior notice and hereby you agree to review these Terms of Use periodically to be aware of any changes.
                </p>
           
              <h5 className="mt-4 mb-3">Intellectual Property</h5>
              <p className="text-justify">All intellectual property on the website is owned by Imedia Enterprise or its licensors. This includes materials protected by copyright, trademark, or patent laws. The content on the website, including but not limited to text, graphics or code is a collective work under Malaysia and other copyright laws; All rights reserved. All trademarks, service marks and trade names (e.g., Imedia Enterprise name and Imedia Enterprise design are trademarks or registered trademarks of Imedia Enterprise. Unless otherwise restricted, you may use the content of the website only for your non-commercial use to enquire with Institutes, Colleges or Universities (or their representative agents) or to register for Imedia Enterprise services. Any other use is prohibited unless agreed to by Imedia Enterprise in writing. You agree not to change or delete any ownership notices from materials downloaded or printed from the website.</p>
            <h6>
                <p className="fw-light text-justify">
                Note:
                Safeguard your User ID/Password. Do not allow anyone else to use your user ID/password to access the website. You agree to notify Imedia Enterprise immediately of any unauthorized use of your user ID/password. Imedia Enterprise shall not be responsible for any loss that results from the unauthorized use of your user id/password, with or without your knowledge.
                </p>
            </h6>
              <h5 className="mt-4 mb-3">Posting Rules</h5>
              <ol className="list-spacing">
                <li >Know your post. Stay on topic and post only constructive comments and questions. Unless the website feature asks for it, don't talk about policies, indulge in speculations or rumors about Imedia Enterprise and Imedia Enterprise services, or anything else off-topic.</li>
                <li >Know yourself. Flaming and insults are prohibited. Do not post content that is offensive, libelous, defamatory, indecent, harmful, harassing, intimidating, threatening, hateful, abusive, vulgar, obscene, pornographic, sexually explicit, or offensive in a sexual, racial, cultural, or ethnic context.</li>
                <li >Think before you post. Do not post personal information, including your email address, IM address, or phone number. Do not solicit personally identifiable information from other website users.</li>
                <li >It’s for students. This website is not to be used for any commercial purpose. Do not post any advertising or commercial content. Do not post any content that involves the transmission of "junk mail," "chain letters," or unsolicited mass mailing or "spamming."</li>
                <li >Reality check. Impersonating someone else and utilizing the services of this website for the sake of pranks or anything to that effect is immature. Your account will be suspended if this is found to be true.</li>
                <li >Challenge yourself. Do not post any content that includes information that is false, misleading, inaccurate, fraudulent, or deceptive, or that promotes illegal activities.</li>
                <li>Know your post. Stay on topic and post only constructive comments and questions. Unless the website feature asks for it, don't talk about policies, indulge in speculations or rumors about Imedia Enterprise and Imedia Enterprise services, or anything else off-topic.</li>
                <li>Know yourself. Flaming and insults are prohibited. Do not post content that is offensive, libelous, defamatory, indecent, harmful, harassing, intimidating, threatening, hateful, abusive, vulgar, obscene, pornographic, sexually explicit, or offensive in a sexual, racial, cultural, or ethnic context.</li>
                <li>Think before you post. Do not post personal information, including your email address, IM address, or phone number. Do not solicit personally identifiable information from other website users.</li>
                <li>It’s for students. This website is not to be used for any commercial purpose. Do not post any advertising or commercial content. Do not post any content that involves the transmission of "junk mail," "chain letters," or unsolicited mass mailing or "spamming."</li>
                <li>Reality check. Impersonating someone else and utilizing the services of this website for the sake of pranks or anything to that effect is immature. Your account will be suspended if this is found to be true.</li>
                <li>Challenge yourself. Do not post any content that includes information that is false, misleading, inaccurate, fraudulent, or deceptive, or that promotes illegal activities.</li>
                <li>Rights. You promise that you own or control all rights in any User Generated Content that you post to any Imedia Enterprise website. You are responsible for ensuring that any User Generated Content that you post does not, and will not, violate anyone else’s rights. Legal points Do not post any content that violates any law. Do not post any content, or take any action, that is designed to interrupt, destroy, or limit the functionality of any computer software 
                    or hardware, or telecommunications equipment or to interfere with or disrupt the website.</li>
              </ol>

              <h5 className="mt-4 mb-3">Complaints</h5>
              <p className="text-justify">Immediately notify Imedia Enterprise in writing of any objectionable content appearing on the website. Imedia Enterprise will make good faith efforts to investigate allegations OF 
                ABUSE but makes no promise that it will edit or remove any specific User Generated Content.</p>

              <h5 className="mt-4 mb-3">Links</h5>
              <p className="text-justify">Imedia Enterprise may link to websites operated by other companies. Imedia Enterprise has no control over these linked websites,
                 which have separate terms of use and privacy policies.</p>

              <p className="mt-4 text-justify">
                If you have any concerns about any aspect of the processing, kindly notify us at{" "}
                <a href="mailto:admin@studypal.my">admin@studypal.my</a>
              </p>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default Term;