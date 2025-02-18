export type Key = "does" | "wants";

export type Item = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  wrapper: Key;
};

export type Column = Item[];

export type Board = Record<Key, Column>;

export const initialState: Board = {
  does: [
    {
      id: 1,
      name: "John Doe",
      email: "john@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "does",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "does",
    },
    {
      id: 3,
      name: "Jim Doe",
      email: "jim@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "does",
    },
    {
      id: 4,
      name: "Jill Doe",
      email: "jill@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "does",
    },
    {
      id: 5,
      name: "Gabe Doe",
      email: "jill@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "does",
    },
    {
      id: 6,
      name: "Cinthya Doe",
      email: "jill@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "does",
    },
    {
      id: 7,
      name: "Cecilia Doe",
      email: "jill@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "does",
    },
    {
      id: 8,
      name: "Noah Doe",
      email: "jill@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "does",
    },
  ],
  wants: [
    {
      id: 9,
      name: "Gaby Doe",
      email: "john@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "wants",
    },
    {
      id: 10,
      name: "July Doe",
      email: "jane@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "wants",
    },
    {
      id: 11,
      name: "Larry Doe",
      email: "jim@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "wants",
    },
    {
      id: 12,
      name: "Jill Doe",
      email: "jill@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "wants",
    },
    {
      id: 13,
      name: "Phil Doe",
      email: "jill@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "wants",
    },
    {
      id: 14,
      name: "Shane Doe",
      email: "jill@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "wants",
    },
    {
      id: 15,
      name: "Mary Doe",
      email: "jill@doe.com",
      phone: "1234567890",
      address: "123 Main St, Anytown, USA",
      wrapper: "wants",
    },
  ],
};
