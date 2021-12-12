import { ResultPayment } from "pages";
import { Route } from "react-router-dom";
export default function AnotherLayout() {
    return (
      <div>
        <Route path="/result" exact component={ResultPayment} />
      </div>
    );
}
