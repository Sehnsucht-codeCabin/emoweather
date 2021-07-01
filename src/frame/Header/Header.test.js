import { mount } from "enzyme";
import Frame from "..";
import { EmoweatherProvider } from "../../context/Provider";

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        pathname: '/',
    }),
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe("Header", () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(<EmoweatherProvider><Frame /></EmoweatherProvider>);
    });

    test("assess header elements", () => {
        const logo = wrapper.find("[alt='emoweather logo']");
        expect(logo).toHaveLength(1);

        const aboutModalButton = wrapper.find("[data-test='about-button']");
        expect(aboutModalButton).toHaveLength(1);

        const githubLink = wrapper.find("[data-test='github-link']");
        expect(githubLink).toHaveLength(1);
    });

    test("click on about button to trigger modal", () => {
        const aboutModalButton = wrapper.find("[data-test='about-button']");
        expect(aboutModalButton).toHaveLength(1);

        let modalBackground = wrapper.find("[data-test='modal-background']");
        expect(modalBackground).toHaveLength(0);

        aboutModalButton.simulate("click");

        modalBackground = wrapper.find("[data-test='modal-background']");
        expect(modalBackground).toHaveLength(1);
        const closeModalButton = wrapper.find("[data-test='close-modal-button']");
        expect(closeModalButton).toHaveLength(1);
        const paragraphs = modalBackground.find("p");
        expect(paragraphs).toHaveLength(6);
    });
});