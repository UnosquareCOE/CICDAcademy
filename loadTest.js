import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export const errorRate = new Rate("errors");
export const options = {
  vus: 10,
  duration: "10s",
};
export default function () {
  const res = http.get("http://localhost:3000?input=Hello");
  const checkRes = check(
    res,
    {
      "status is 200": (r) => r.status === 200,
    } || errorRate.add(1)
  );
}
