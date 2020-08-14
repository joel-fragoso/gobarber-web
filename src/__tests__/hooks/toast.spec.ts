import { renderHook, act } from '@testing-library/react-hooks';

import { useToast, ToastProvider } from '../../hooks/toast';

describe('Toast Hook', () => {
  it('should be able to add message', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.addToast({
        type: 'success',
        title: 'title',
        description: 'description',
      });
    });

    await waitForNextUpdate();

    expect(result.current.addToast).toHaveBeenCalledTimes(1);
  });

  // it('should restore saved data from storage when Toast inits', () => {
  //   jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
  //     switch (key) {
  //       case '@GoBarber:token':
  //         return 'jwt';
  //       case '@GoBarber:user':
  //         return JSON.stringify({
  //           id: 'uuid',
  //           name: 'John Doe',
  //           email: 'johndoe@example.com',
  //         });
  //       default:
  //         return null;
  //     }
  //   });

  //   const { result } = renderHook(() => useToast(), {
  //     wrapper: ToastProvider,
  //   });

  //   expect(result.current.user.email).toEqual('johndoe@example.com');
  // });

  // it('should be able to sign out', async () => {
  //   jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
  //     switch (key) {
  //       case '@GoBarber:token':
  //         return 'jwt';
  //       case '@GoBarber:user':
  //         return JSON.stringify({
  //           id: 'uuid',
  //           name: 'John Doe',
  //           email: 'johndoe@example.com',
  //         });
  //       default:
  //         return null;
  //     }
  //   });

  //   const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

  //   const { result } = renderHook(() => useToast(), {
  //     wrapper: ToastProvider,
  //   });

  //   act(() => {
  //     result.current.signOut();
  //   });

  //   expect(removeItemSpy).toHaveBeenCalledTimes(2);
  //   expect(result.current.user).toBeUndefined();
  // });

  // it('should be able to update user data', async () => {
  //   const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

  //   const { result } = renderHook(() => useToast(), {
  //     wrapper: ToastProvider,
  //   });

  //   const user = {
  //     id: 'uuid',
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     avatar_url: 'avatar.png',
  //   };

  //   act(() => {
  //     result.current.updateUser(user);
  //   });

  //   expect(setItemSpy).toHaveBeenCalledWith(
  //     '@GoBarber:user',
  //     JSON.stringify(user),
  //   );

  //   expect(result.current.user).toEqual(user);
  // });
});
