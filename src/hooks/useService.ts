
import useToast, { ToastOption } from '@/hooks/useToast';
import ApiConnection from '@/modules/ApiConnection';
import { useDispatch } from 'react-redux';
import CookieService from '@/services/CookieService';
import UserService from '@/services/UserService';

const useService = () => {
  const { toast }: { toast: (msg: string, options?: ToastOption) => void } =
    useToast();
  const dispatch = useDispatch();

  const cookie = new CookieService();

  const api: ApiConnection = new ApiConnection({
    toast,
    cookie,
  });
  

  const serviceParams = {
    api: api,
    cookie: cookie,
    dispatch,
  };

  const services = {
    cookie: cookie,
    user: new UserService(serviceParams),
  };

  return { ...services };
};

export default useService;
