"use client";

import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/users";
import useNotesStore from "@/store/useNotesStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function LoginContent() {
	const [open, setOpen] = useState(false);
	const { user } = useNotesStore();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [logging, setLogging] = useState(false);
	const redirectUrl = searchParams.get("redirect") || "/";
	console.log("🚀 ~ Login ~ redirectUrl:", redirectUrl);

	useEffect(() => {
		if (user) {
			router.push(redirectUrl);
		}
	}, [user, router, redirectUrl]);

	const handleLogging = () => {
		setLogging(true);
		setOpen(true);
	};

	return (
		<div>
			{!logging && (
				<div className="p-4 text-center">
					Vous devez vous connecter pour utiliser cette application
				</div>
			)}
			<div className="flex justify-center p-2">
				{logging ? (
					<div>En cours de connexion...</div>
				) : (
					<Button onClick={handleLogging}>Se connecter</Button>
				)}
			</div>

			<LoginDialog open={open} setOpen={setOpen} />
		</div>
	);
}

export default function Login() {
	return (
		<Suspense fallback={<div className="p-4 text-center">Chargement...</div>}>
			<LoginContent />
		</Suspense>
	);
}
