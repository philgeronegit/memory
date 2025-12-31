import { useUpdatePassword } from "@/application/mutations/use-update-password";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/domain/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    password: z.string().min(4, {
      message: "Le mot de passe doit comporter au moins 4 charactères."
    }),
    confirmPassword: z.string().min(4, {
      message: "Le mot de passe doit comporter au moins 4 charactères."
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"]
  });

interface ModifyPasswordDialogProps {
  user: User | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const ModifyPasswordDialog: React.FC<ModifyPasswordDialogProps> = ({
  user,
  isOpen,
  onClose
}) => {
  const [replyError, setReplyError] = useState<string>();
  const updatePassword = useUpdatePassword();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        password: "",
        confirmPassword: ""
      });
      setReplyError(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!user) return;

    try {
      await updatePassword.mutateAsync({
        id: user.id,
        password: data.password
      });
      form.reset();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la modification du mot de passe:", error);
      setReplyError(
        "Une erreur est survenue lors de la modification du mot de passe : " +
        (error instanceof Error ? error.message : String(error))
      );
    }
  }

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Modifier le mot de passe de {user?.username}
          </DialogTitle>
          <DialogDescription>
            Mettre à jour le mot de passe de l&apos;utilisateur.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row justify-center p-2 gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Entrer le nouveau mot de passe"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center gap-2">
                <Button type="submit" disabled={updatePassword.isPending}>
                  {updatePassword.isPending ? "En cours..." : "Sauvegarder"}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Annuler
                </Button>
              </div>
            </form>
          </Form>
        </div>
        {replyError && (
          <div className="text-red-500 text-sm mt-2">{replyError}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
