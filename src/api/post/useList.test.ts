import { renderHook } from "@testing-library/react-hooks";
import { useList } from "./useList";
import MockAdapter from "axios-mock-adapter";
import client from "../client";

test("should get all posts data", async () => {
  const spy = jest.spyOn(client, "get");
  const mockClient = new MockAdapter(client);
  mockClient.onGet("/posts").reply(200, mockedData);

  const { result, waitForNextUpdate } = renderHook(() => useList());

  expect(result.current.loading).toBeTruthy();
  await waitForNextUpdate();

  expect(spy).toHaveBeenCalled();
  expect(result.current.error).toBeNull();
  expect(result.current.loading).toBeFalsy();
  expect(result.current.data).toEqual(mockedData);
});

test("should throw error on get all posts data", async () => {
  const spy = jest.spyOn(client, "get");
  const mockClient = new MockAdapter(client);
  mockClient.onGet("/posts").reply(400);

  const { result, waitForNextUpdate } = renderHook(() => useList());

  expect(result.current.loading).toBeTruthy();
  await waitForNextUpdate();

  expect(spy).toHaveBeenCalled();
  expect(result.current.error).not.toBeNull();
  expect(result.current.loading).toBeFalsy();
  expect(result.current.data).toEqual(null);
});

const mockedData = [
  {
    id: 1,
    title: "Madrid",
    content:
      "Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole.",
    lat: "40.41678",
    long: "-3.70379",
    image_url: "https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg",
    created_at: "2020-03-27T14:10:06.351Z",
    updated_at: "2020-03-27T14:10:06.351Z",
  },
  {
    id: 2,
    title: "Barcelona",
    content:
      "Barcelona is the capital and largest city of Catalonia with a population of 1.6 million within city limits.",
    lat: "41.3851",
    long: "2.1734",
    image_url:
      "https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2017/05/17/15/barcelona-skyline.jpg",
    created_at: "2020-03-27T14:10:06.358Z",
    updated_at: "2020-03-27T14:10:06.358Z",
  },
  {
    id: 3,
    title: "Berlin",
    content:
      "Berlin is the capital and the largest city of Germany as well as one of its 16 constituent states. With a population of approximately 3.7 million, Berlin is the second...",
    lat: "52.5065133",
    long: "13.1445548",
    image_url:
      "https://lonelyplanetwp.imgix.net/2015/12/brandenburg-gate-berlin-GettyRF-1500-cs.jpg",
    created_at: "2020-03-27T14:10:06.363Z",
    updated_at: "2020-03-27T14:10:06.363Z",
  },
];
