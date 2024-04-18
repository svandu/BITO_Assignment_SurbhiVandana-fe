import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import CalenderField from "./CalenderField";

import { useSubmitForm } from "@/lib/reactQuery/queries";
import { useRouter } from "next/router";
import ROUTES from "@/constant";

const formSchema = yup.object({
  subscriberId: yup.string().required("subscriberId is required"),
  subscriberName: yup.string().required("subscriberName is required"),
  subscriberCountry: yup.string().required("subscriberCountry is required"),
  subscriberDuration: yup.string().required("subscriberDuration is required"),
});

const SubscriptionForm = ({ closeForm }) => {
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      subscriberId: "",
      subscriberName: "",
      subscriberCountry: "",
      subscriberDuration: "",
    },
  });
  const { register, formState, reset } = methods;

  const addSubscription = useSubmitForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    const { subscriberDuration, ...restFields } = data;
    const newData = {
      ...restFields,
      subscriberDuration: new Date(subscriberDuration),
    };
    const response = await addSubscription.mutateAsync(newData);

    if (response?.status === 201) {
      router.replace(ROUTES.SUBSCRIPTION_DETAILS);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className="mt-10 space-y-3"
      >
        <div>
          <Label htmlFor="subscriberId" className="text-gray-500 capitalize">
            subscriber Id
          </Label>
          <Input
            type="text"
            id="subscriberId"
            placeholder="Enter your subscriber id"
            className="py-3 border-gray-300 shadow-none rounded-sm"
            {...register("subscriberId")}
          />
          {formState.errors.subscriberId && (
            <p className="text-red-500 text-sm ml-1">
              {formState.errors.subscriberId.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="subscriberName" className="text-gray-500 capitalize">
            subscriber name
          </Label>
          <Input
            type="text"
            id="subscriberName"
            placeholder="Enter your subscriber name"
            className="py-3 border-gray-300 shadow-none rounded-sm"
            {...register("subscriberName")}
          />
          {formState.errors.subscriberName && (
            <p className="text-red-500 text-sm ml-1">
              {formState.errors.subscriberName.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="subscriberCountry"
            className="text-gray-500 capitalize"
          >
            subscriber country
          </Label>
          <Input
            type="text"
            id="subscriberCountry"
            placeholder="Enter your subscriber country"
            className="py-3 border-gray-300 shadow-none rounded-sm"
            {...register("subscriberCountry")}
          />
          {formState.errors.subscriberCountry && (
            <p className="text-red-500 text-sm ml-1">
              {formState.errors.subscriberCountry.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="subscriberDuration"
            className="text-gray-500 capitalize"
          >
            subscriber duration
          </Label>
          <FormField
            control={methods.control}
            name="subscriberDuration"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <CalenderField id="subscriberDuration" field={field} />
              </FormItem>
            )}
          />
          {formState.errors.subscriberDuration && (
            <p className="text-red-500 text-sm ml-1">
              {formState.errors.subscriberDuration.message}
            </p>
          )}
        </div>

        <Button className="bg-indigo-600 rounded-sm capitalize hover:bg-indigo-700 w-full">
          Submit
        </Button>
        <Button
          className="rounded-sm capitalize hover:bg-gray-100 border bg-transparent text-gray-800 w-full"
          onClick={() => closeForm(false)}
        >
          Cancel
        </Button>
      </form>
    </FormProvider>
  );
};

export default SubscriptionForm;
