import React from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import showdown from "showdown";

const converter = new showdown.Converter({
  noHeaderId: true,
  simplifiedAutoLink: true,
});

const LawyerBlogPosts = ({ lawBlogPost, gradeClass }) => (
  <>
    <h2 className="heading-full-line pt-5 pb-2">Αρθρογραφία</h2>
    {lawBlogPost && lawBlogPost.length > 0 ? (
      <div className="blog-posts">
        <Row>
          {lawBlogPost.map((post) => (
            <Col key={post.lawPostSlug} md={4} className="mb-4">
              <Card
                className={`blog-post-card blog-post-card-${gradeClass} h-100 p-4`}
              >
                <Card.Body>

                  <Card.Title className="text-center">
                    <Link href={`/blog/${post.lawPostSlug}`} passHref legacyBehavior>
                      <a className="blog-post-lawyer-title">
                        {post.lawPostTitle}
                      </a>
                    </Link>
                  </Card.Title>

                  <Card.Text>
                    <span className="blog-post-excerpt my-4">
                      {converter
                        .makeHtml(post.lawPostBody.markdown.substring(0, 200))
                        .replace(/<[^>]+>/g, "")}...
                    </span>
                  </Card.Text>

                  <Link href={`/blog/${post.lawPostSlug}`} passHref legacyBehavior>
                    <Button variant="outline-dark" as="a">
                      Πλήρες Άρθρο
                    </Button>
                  </Link>
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    ) : (
      <p>Δεν υπάρχουν δημοσιεύσεις ιστολογίου για αυτόν τον δικηγόρο.</p>
    )}
  </>
);

export default LawyerBlogPosts;
