import { mount } from "enzyme";
import { Provider } from "react-redux";

const mountComponent = (component, store = undefined) => {
    return mount(store ? <Provider store={store}>{component}</Provider> : component);
}

export { mountComponent };