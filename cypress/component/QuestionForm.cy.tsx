import QuestionForm from "@/app/components/components/question-form";
import { mount } from "cypress/react";
import "../../app/globals.css";
import { httpClient } from "@/app/utils/httpClient";

describe("<QuestionForm />", () => {
  const question = {
    id: 1,
    question: "1 + 1 bằng mấy?",
  };

  it("should display the question", () => {
    mount(<QuestionForm question={question} />);
    cy.contains("1 + 1 bằng mấy?").should("exist");
  });

  it("should show validation error if submitted empty", () => {
    mount(<QuestionForm question={question} />);
    cy.get("button[type=submit]").click();
    cy.contains("Vui lòng nhập câu trả lời của bạn").should("exist");
  });

  it("should call onSuccess if answer is correct", () => {
    const onSuccess = cy.stub().as("onSuccessStub");
    cy.stub(httpClient, "post").resolves({ data: true });
    mount(<QuestionForm question={question} onSuccess={onSuccess} />);
    cy.get("input").type("2");
    cy.get("button[type=submit]").click();
    cy.get("@onSuccessStub").should("have.been.calledOnce");
  });

  for (let i = 0; i < 5; i++) {
    it("should show server error if answer is incorrect", () => {
      cy.stub(httpClient, "post").resolves({ data: false });

      mount(<QuestionForm question={question} />);
      cy.get("input").type(i.toString());
      cy.get("button[type=submit]").click();
      cy.contains("Câu trả lời của bạn chưa chính xác!").should("exist");
    });
  }

  it("should show error if API throws exception", () => {
    cy.stub(httpClient, "post").rejects(new Error("Lỗi server"));
    mount(<QuestionForm question={question} />)
    cy.get("input").type("10")
    cy.get("button[type=submit]").click()
    cy.contains("Lỗi server").should("exist")
  })

  it("should show loading UI when submitting", () => {
    const delay = () => new Promise((res) => setTimeout(() => res({data: true}), 500))
    cy.stub(httpClient, "post").callsFake(delay)
    mount(<QuestionForm question={question} />)
    cy.get("input").type("2")
    cy.get("button[type=submit]").click()

    cy.contains("Đang kiểm tra").should("exist")
  })

  it("should not call API if question is null", () => {
    const postStub = cy.stub(httpClient, "post")
    mount(<QuestionForm question={null} />)

    cy.get("input").type("abc")
    cy.get("button[type=submit]").click()
    cy.wrap(postStub).should("not.have.been.called")
  })
});
