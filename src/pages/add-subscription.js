import SubscriptionForm from "@/components/SubscriptionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const AddSubscription = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-[500px] w-full">
      {!showForm && (
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center w-[300px] space-y-2">
            <div>
              <Label htmlFor="upload_json">Upload a JSON</Label>
              <Input id="upload_json" type="file" />
            </div>
            <p>or</p>
            <Button
              className="bg-indigo-600 rounded-sm capitalize hover:bg-indigo-700 w-full"
              onClick={() => setShowForm(true)}
            >
              Fill the form
            </Button>
          </div>
        </div>
      )}
      {showForm && <SubscriptionForm closeForm={setShowForm} />}
    </div>
  );
};

export default AddSubscription;
